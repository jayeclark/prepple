import { App, CfnOutput, Stack } from 'aws-cdk-lib';
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { InstanceType, InstanceSize, InstanceClass, Vpc, IVpc, SubnetType, SecurityGroup } from "aws-cdk-lib/aws-ec2";
import {
  DatabaseInstance as RdsDatabaseInstance,
  DatabaseInstanceReadReplica as RdsDatabaseInstanceReadReplica,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
  Credentials,
} from "aws-cdk-lib/aws-rds";
import { DatabaseCluster as DocdbDatabaseCluster } from "aws-cdk-lib/aws-docdb";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { getCfnResourceName, DeploymentEnvironment } from '../utils/cfnUtils';
import { DefaultCustomStackProps } from "../utils/types";
import { VpcStack } from './VpcStack';
import path = require('path');
import { CfnUserPoolGroup, UserPool, VerificationEmailStyle } from 'aws-cdk-lib/aws-cognito';
import { FederatedPrincipal, Role, PolicyStatementProps, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { UserPoolGroupTypes, UserPoolGroupConfig } from '../config/userPoolConfig';
import { VIDEO_BUCKET_NAME, PHOTO_BUCKET_NAME, TRANSCRIPT_BUCKET_NAME, VIDEO_RESUME_BUCKET_NAME } from '../config/resourceNames';

interface BackEndStackProps extends DefaultCustomStackProps {
  vpcStack: VpcStack;
}

const POSTGRES_READ_REPLICA_COUNT = 1;
const DOCDB_READ_REPLICA_COUNT = 1;
export const POSTGRES_USERNAME = 'postgres';
export const POSTGRES_DBNAME = 'pg';
export const DOCDB_USERNAME = 'mydevinterview';
export const DOCDB_DBNAME = 'docdb';

export function getSecretNameExportName(dbName: string) {
  return getExportName('MyDevInterview', dbName, 'secret-name');
}

export function getSecretArnExportName(dbName: string) {
  return getExportName('MyDevInterview', dbName, 'secret-arn');
}

export function getSecretFullArnExportName(dbName: string) {
  return getExportName('MyDevInterview', dbName, 'secret-full-arn');
}

function getExportName(prefix: string, dbName: string, exportedProperty: string) {
  return `${prefix}:${dbName}-${exportedProperty}`;
}

export class BackEndStack extends Stack {
  constructor(scope: App, id: string, props: BackEndStackProps) {
    super(scope, id, props)

    // Data stores
    const { postgresWriteInstance, postgresReadReplicas, pgCredentials } = this.createPostgresDBResources(props.vpcStack.vpc, props.deploymentEnvironment);
    const pgReadEndpoints: Record<string, string> = {};
    postgresReadReplicas.forEach((replica, index) => {
      const key = `PG_READ_ENDPOINT_${index + 1}`;
      pgReadEndpoints[key] = replica.dbInstanceEndpointAddress;
    })
    const { docdbCluster, docdbCredentials } = this.createDocDBResources(props.vpcStack.vpc, props.deploymentEnvironment);

    // Storage
    const videoBucketName = getCfnResourceName(VIDEO_BUCKET_NAME, props.deploymentEnvironment);
    const videoBucket = new Bucket(this, videoBucketName, { bucketName: videoBucketName });

    const photoBucketName = getCfnResourceName(PHOTO_BUCKET_NAME, props.deploymentEnvironment);
    const photoBucket = new Bucket(this, photoBucketName, { bucketName: photoBucketName });
    
    const transcriptsBucketName = getCfnResourceName(TRANSCRIPT_BUCKET_NAME, props.deploymentEnvironment);
    const transcriptsBucket = new Bucket(this, transcriptsBucketName, { bucketName: transcriptsBucketName });

    const videoResumeBucketName = getCfnResourceName(VIDEO_RESUME_BUCKET_NAME, props.deploymentEnvironment);
    const videoResumeBucket = new Bucket(this, videoResumeBucketName, { bucketName: videoResumeBucketName })

    const buckets = { videoBucket, photoBucket, transcriptsBucket, videoResumeBucket };

    // Spring App
    const springApp = new Function(this, 'LambdaAPI', {
      runtime: Runtime.JAVA_11,
      memorySize: 256,
      handler: 'com.prepple.api.StreamLambdaHandler::handleRequest', //'com.mydevinterview.api.StreamLambdaHandler::handleRequest',
      code: Code.fromAsset(path.join(__dirname, "../../backend/.aws-sam/build/PreppleAPI")), 
      environment: {
        PG_WRITE_ENDPOINT: postgresWriteInstance.dbInstanceEndpointAddress,
        ...pgReadEndpoints,
        PG_USERNAME: POSTGRES_USERNAME,
        PG_PASSWORD: pgCredentials.secretValueFromJson('password').toString(),
        DOCDB_WRITE_HOSTNAME: docdbCluster.clusterEndpoint.hostname,
        DOCDB_WRITE_PORT: docdbCluster.clusterEndpoint.portAsString(),
        DOCDB_READ_HOSTNAME: docdbCluster.clusterReadEndpoint.hostname,
        DOCDB_READ_PORT: docdbCluster.clusterReadEndpoint.portAsString(),
        DOCDB_USERNAME: DOCDB_USERNAME,
        DOCDB_PASSWORD: docdbCredentials.secretValueFromJson('password').toString(),
      }
    })

    postgresWriteInstance.grantConnect(springApp);

    const restAPI = new LambdaRestApi(this, `Backend-API-${props.deploymentEnvironment.stage}`, {
      handler: springApp,
    })

    // Backend
    // Requires RDS (postgresql)

    // Requires Rest API gateway
    // Requires lambda that the api gateway connects to
    // - Serve lists of available videos to viewers
    // - Serve actual videos to viewers
    // - Save viewers videos to S3
    // - Cache viewers videos
    // - Serve video resumes to viewers
    // - Serve & record video ratings
    // - Serve & record planned answers
    // - Analyze videos
    // - Analyze planned answers
    // - Auth functions
    // - Subscription functions
  }

  createPostgresDBResources(vpc: Vpc, env: DeploymentEnvironment) {  
    const pgCredentials = this.createPostgresDBCredentials(env);

    const defaultSecurityGroup = SecurityGroup.fromSecurityGroupId(this, `SG-${env.stage}`, vpc.vpcDefaultSecurityGroup);

    const postgresWriteInstance: RdsDatabaseInstance = new RdsDatabaseInstance(this, getCfnResourceName('PostgresInstance', env), {
      engine: DatabaseInstanceEngine.postgres({ version: PostgresEngineVersion.VER_14_5 }),
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
      vpc,
      securityGroups: [defaultSecurityGroup],
      maxAllocatedStorage: 200,
      credentials: Credentials.fromSecret(pgCredentials),
    });

    const postgresReadReplicas: RdsDatabaseInstanceReadReplica[] = [];

    let count = 1;
    for (count = 1; count <= POSTGRES_READ_REPLICA_COUNT; count += 1) {
      const currentReadReplicaInstance = new RdsDatabaseInstanceReadReplica(this, getCfnResourceName(`PostgresReadReplica-${count}`, env), {
        sourceDatabaseInstance: postgresWriteInstance,
        instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
        vpc,
      });
      postgresReadReplicas.push(currentReadReplicaInstance);
    }

    new CfnOutput(this, `RDSWriteEndpoint-${env.stage}`, { value: postgresWriteInstance.dbInstanceEndpointAddress });
    postgresReadReplicas.forEach((replica, index) => {
      new CfnOutput(this, `RDSReadEndpoint${index+1}-${env.stage}`, { value: replica.dbInstanceEndpointAddress });
    })
    return { postgresWriteInstance, postgresReadReplicas, pgCredentials }
  }

  createDocDBResources(vpc: IVpc, env: DeploymentEnvironment) {
    const docdbCredentials = this.createDocDBCredentials(env);
    new StringParameter(this, 'DocdbCredentialsArn', {
      parameterName: `${env.stage}-credentials-arn`,
      stringValue: docdbCredentials.secretArn,
    });

    const docdbCluster = new DocdbDatabaseCluster(this, 'Database', {
      masterUser: {
        username: docdbCredentials.secretValueFromJson('username').toString(),
        password: docdbCredentials.secretValueFromJson('password'),
      },
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MEDIUM),
      instances: 1 + DOCDB_READ_REPLICA_COUNT,
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE_ISOLATED,
      },
      vpc
    });

    docdbCluster.connections.allowDefaultPortInternally('Allow internal connections to the default port');

    return { docdbCluster, docdbCredentials };
  }

  createDBCredentials(env: DeploymentEnvironment, username: string, dbName: string) {
    const dbCredentialsSecret = new Secret(this, `${env.stage}-${dbName}-CredentialsSecret`, {
      secretName: `${env.stage}-${dbName}-credentials`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username,
        }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password'
      }
    });

    new CfnOutput(this, `${dbName} Secret Name`, { exportName: getSecretNameExportName(dbName), value: dbCredentialsSecret.secretName }); 
    new CfnOutput(this, `${dbName} Secret ARN`, { exportName: getSecretArnExportName(dbName), value: dbCredentialsSecret.secretArn}); 
    new CfnOutput(this, `${dbName} Secret Full ARN`, { exportName: getSecretFullArnExportName(dbName), value: dbCredentialsSecret.secretFullArn || '' });

    return dbCredentialsSecret;
  }

  createPostgresDBCredentials(env: DeploymentEnvironment) {
    return this.createDBCredentials(env, POSTGRES_USERNAME, POSTGRES_DBNAME);
  }

  createDocDBCredentials(env: DeploymentEnvironment) {
    return this.createDBCredentials(env, DOCDB_USERNAME, DOCDB_DBNAME);
  }

  createUserPool(env: DeploymentEnvironment, buckets: Record<string, Bucket>) {
    const userPool = new UserPool(this, getCfnResourceName('UserPool', env), {
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'Verify your email for full access to Prepple.',
        emailBody: 'Hello {username},\n\nThanks for signing up for an account with Prepple! Your verification code is {####}',
        emailStyle: VerificationEmailStyle.CODE,
        smsMessage: 'Hello {username}, Thanks for signing up for an account with Prepple! Your verification code is {####}'
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true
      }
    })

    // Create user pool groups
    const groupKeys = Object.keys(UserPoolGroupConfig);
    const groups: any = {};
    groupKeys.forEach((group) => {
      // create user pool group and role
      const { userPoolGroup, userPoolRole } = this.createUserPoolGroupAndRole(group, env, userPool.userPoolId);
      
      // add permissions to user pool role based on configuration
      const policyStatements: PolicyStatement[] = this.generateUserPoolGroupPolicyStatements(UserPoolGroupConfig[group as UserPoolGroupTypes], buckets);
      policyStatements.forEach((policyStatement) => userPoolRole.addToPolicy(policyStatement));
      groups[group] = { group: userPoolGroup, role: userPoolRole };
    })
  }

  createUserPoolGroupAndRole(groupName: string, env: DeploymentEnvironment, userPoolId: string) {
    const userPoolGroup = new CfnUserPoolGroup(this, getCfnResourceName(`${groupName}Group`, env), {
      groupName: groupName.toLowerCase(),
      userPoolId: userPoolId
    })
    const userPoolRole = new Role(this, getCfnResourceName(`${groupName}Role`, env), {
      assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
        StringEquals: { 'cognito-identity.amazonaws.com:aud': userPoolId },
        'ForAnyValue:StringLike': { 'cognito-identity.amazonaws.com:amr': 'authenticated' },
      }, 'sts:AssumeRoleWithWebIdentity')
    })
    return { userPoolGroup, userPoolRole };
  }

  generateUserPoolGroupPolicyStatements(statementConfig: PolicyStatementProps[], buckets: Record<string, Bucket>): PolicyStatement[] {
    const policyStatements: PolicyStatement[] = [];
    const bucketKeys: string[] = Object.keys(buckets);

    statementConfig.forEach((statement: PolicyStatementProps) => {
      const newStatementConfig = { ...statement };
      
      newStatementConfig.resources = newStatementConfig.resources?.map((resource) => {
        let newResource = resource;
        bucketKeys.forEach((key) => {
          newResource = newResource.replace(`{{${key}}}`, buckets[key].bucketName)
        })
        return newResource;
      }) || undefined;      
      
      const policyStatement = new PolicyStatement(newStatementConfig);
      policyStatements.push(policyStatement);
    })

    return policyStatements;
  }
}