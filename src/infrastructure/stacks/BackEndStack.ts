import { App, CfnOutput, Stack } from 'aws-cdk-lib';
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Vpc, IVpc, SubnetType, SecurityGroup } from "aws-cdk-lib/aws-ec2";
import {
  DatabaseInstance as RdsDatabaseInstance,
  DatabaseInstanceReadReplica as RdsDatabaseInstanceReadReplica,
  Credentials,
} from "aws-cdk-lib/aws-rds";
import { DatabaseCluster as DocdbDatabaseCluster } from "aws-cdk-lib/aws-docdb";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { getCfnResourceName, DeploymentEnvironment, getDomainName } from '../utils/cfnUtils';
import { DefaultCustomStackProps } from "../utils/types";
import { VpcStack } from './VpcStack';
import path = require('path');
import { CfnUserPoolClient, CfnUserPoolGroup, UserPool, UserPoolIdentityProvider, UserPoolIdentityProviderGoogle, VerificationEmailStyle } from 'aws-cdk-lib/aws-cognito';
import { FederatedPrincipal, Role, PolicyStatementProps, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { UserPoolGroupTypes, UserPoolGroupConfig } from '../config/userPoolConfig';
import { VIDEO_BUCKET_NAME, PHOTO_BUCKET_NAME, TRANSCRIPT_BUCKET_NAME, VIDEO_RESUME_BUCKET_NAME } from '../config/resourceNames';
import { Domain } from '../utils/constants';
import {
  PG_ENGINE,
  PG_WRITE_INSTANCE_TYPE,
  PG_MAX_ALLOCATED_STORAGE,
  PG_PORT,
  PG_DBNAME,
  PG_READ_INSTANCE_TYPE,
  DOCDB_INSTANCE_TYPE,
  DOCDB_READ_INSTANCE_COUNT,
  POSTGRES_USERNAME,
  DOCDB_USERNAME,
  POSTGRES_READ_INSTANCE_COUNT,
  POSTGRES_DB_ABBREVIATION,
  DOCDB_DB_ABBREVIATION
} from '../config/backendStackConfig';

interface BackEndStackProps extends DefaultCustomStackProps {
  vpcStack: VpcStack;
}

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
  private readonly env: DeploymentEnvironment;
  constructor(scope: App, id: string, props: BackEndStackProps) {
    super(scope, id, props)
    this.env = props.deploymentEnvironment;

    // Data stores
    const { postgresWriteInstance, postgresReadReplicas, pgCredentials } = this.createPostgresDBResources(props.vpcStack.vpc);
    const pgReadEndpoints: Record<string, string> = {};
    postgresReadReplicas.forEach((replica, index) => {
      const key = `PG_READ_ENDPOINT_${index + 1}`;
      pgReadEndpoints[key] = replica.dbInstanceEndpointAddress;
    })
    const { docdbCluster, docdbCredentials } = this.createDocDBResources(props.vpcStack.vpc);

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

    // User Pool & 
    const { userPool, groups } = this.createUserPool(buckets);
    const userPoolClient = this.createUserPoolClient(userPool.userPoolId);

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
    postgresReadReplicas.forEach((replica) => replica.grantConnect(springApp));

    const restAPI = new LambdaRestApi(this, `Backend-API-${props.deploymentEnvironment.stage}`, {
      handler: springApp,
    })

    if (props.deploymentEnvironment.stage === Domain.BETA) {
      this.createSSMParameters(userPool, userPoolClient, groups, postgresWriteInstance, postgresReadReplicas);
    }

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

  createPostgresDBResources(vpc: Vpc) {  
    const pgCredentials = this.createPostgresDBCredentials();
    new StringParameter(this, getCfnResourceName('PgCredentialsArn', this.env), {
      parameterName: `${this.env.stage}-pg-credentials-arn`,
      stringValue: pgCredentials.secretArn,
    });

    const defaultSecurityGroup = SecurityGroup.fromSecurityGroupId(this, `SG-${this.env.stage}`, vpc.vpcDefaultSecurityGroup);

    const postgresWriteInstance: RdsDatabaseInstance = new RdsDatabaseInstance(this, getCfnResourceName('PostgresInstance', this.env), {
      engine: PG_ENGINE,
      port: PG_PORT,
      instanceType: PG_WRITE_INSTANCE_TYPE,
      databaseName: PG_DBNAME,
      vpc,
      securityGroups: [defaultSecurityGroup],
      maxAllocatedStorage: PG_MAX_ALLOCATED_STORAGE,

      credentials: Credentials.fromSecret(pgCredentials),
    });

    const postgresReadReplicas: RdsDatabaseInstanceReadReplica[] = [];

    let count = 1;
    for (count = 1; count <= POSTGRES_READ_INSTANCE_COUNT; count += 1) {
      const currentReadReplicaInstance = new RdsDatabaseInstanceReadReplica(this, getCfnResourceName(`PostgresReadReplica-${count}`, this.env), {
        sourceDatabaseInstance: postgresWriteInstance,
        instanceType: PG_READ_INSTANCE_TYPE,
        vpc,
      });
      postgresReadReplicas.push(currentReadReplicaInstance);
    }

    new CfnOutput(this, `RDSWriteEndpoint-${this.env.stage}`, { value: postgresWriteInstance.dbInstanceEndpointAddress });
    postgresReadReplicas.forEach((replica, index) => {
      new CfnOutput(this, `RDSReadEndpoint${index+1}-${this.env.stage}`, { value: replica.dbInstanceEndpointAddress });
    })
    return { postgresWriteInstance, postgresReadReplicas, pgCredentials }
  }

  createDocDBResources(vpc: IVpc) {
    const docdbCredentials = this.createDocDBCredentials();
    new StringParameter(this, getCfnResourceName('DocdbCredentialsArn', this.env), {
      parameterName: `${this.env.stage}-docdb-credentials-arn`,
      stringValue: docdbCredentials.secretArn,
    });

    const docdbCluster = new DocdbDatabaseCluster(this, 'Database', {
      masterUser: {
        username: docdbCredentials.secretValueFromJson('username').toString(),
        password: docdbCredentials.secretValueFromJson('password'),
      },
      instanceType: DOCDB_INSTANCE_TYPE,
      instances: 1 + DOCDB_READ_INSTANCE_COUNT,
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE_ISOLATED,
      },
      vpc
    });

    docdbCluster.connections.allowDefaultPortInternally('Allow internal connections to the default port');

    return { docdbCluster, docdbCredentials };
  }

  createDBCredentials(username: string, dbName: string) {
    const dbCredentialsSecret = new Secret(this, `${this.env.stage}-${dbName}-CredentialsSecret`, {
      secretName: `${this.env.stage}-${dbName}-credentials`,
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

  createPostgresDBCredentials() {
    return this.createDBCredentials(POSTGRES_USERNAME, POSTGRES_DB_ABBREVIATION);
  }

  createDocDBCredentials() {
    return this.createDBCredentials(DOCDB_USERNAME, DOCDB_DB_ABBREVIATION);
  }

  createUserPool(buckets: Record<string, Bucket>) {
    const userPool = new UserPool(this, getCfnResourceName('UserPool', this.env), {
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
      const { userPoolGroup, userPoolRole } = this.createUserPoolGroupAndRole(group, userPool.userPoolId);
      
      // add permissions to user pool role based on configuration
      const policyStatements: PolicyStatement[] = this.generateUserPoolGroupPolicyStatements(UserPoolGroupConfig[group as UserPoolGroupTypes], buckets);
      policyStatements.forEach((policyStatement) => userPoolRole.addToPolicy(policyStatement));
      groups[group] = { group: userPoolGroup, role: userPoolRole };
    })
    return { userPool, groups };
  }

  createUserPoolGroupAndRole(groupName: string, userPoolId: string) {
    const userPoolGroup = new CfnUserPoolGroup(this, getCfnResourceName(`${groupName}Group`, this.env), {
      groupName: groupName.toLowerCase(),
      userPoolId: userPoolId,
    })
    const userPoolRole = new Role(this, getCfnResourceName(`${groupName}Role`, this.env), {
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

  createUserPoolClient(userPoolId: string) {
    const userPoolClientName = getCfnResourceName('prepple-auth-client', this.env);
    return new CfnUserPoolClient(this, userPoolClientName, {
      clientName: userPoolClientName,
      generateSecret: false,
      userPoolId,
      allowedOAuthFlows: ['code'],
      allowedOAuthScopes: ['openid', 'email', 'profile'],
      callbackUrLs: [getDomainName(this.env)],
      supportedIdentityProviders: ['COGNITO']
    })
  }

  createSSMParameters(
    userPool: UserPool,
    userPoolClient: CfnUserPoolClient,
    userPoolGroups: Record<string, {group: CfnUserPoolGroup, role: Role}>,
    pgWriteInstance: RdsDatabaseInstance,
    pgReadInstances: RdsDatabaseInstanceReadReplica[]
  ) {
    new StringParameter(this, getCfnResourceName('user-pool-id', this.env), {
      parameterName: getCfnResourceName('user-pool-id', this.env),
      stringValue: userPool.userPoolId,
    });

    new StringParameter(this, getCfnResourceName('cognito-client-id', this.env), {
      parameterName: getCfnResourceName('cognito-client-id', this.env),
      stringValue: userPoolClient.logicalId,
    });

    new StringParameter(this, getCfnResourceName('region', this.env), {
      parameterName: getCfnResourceName('region', this.env),
      stringValue: this.env.region,
    });
    
    new StringParameter(this, getCfnResourceName('freemium-group', this.env), {
      parameterName: getCfnResourceName('freemium-group', this.env),
      stringValue: userPoolGroups.Freemium.group.groupName as string,
    });

    new StringParameter(this, getCfnResourceName('pg-write-host', this.env), {
      parameterName: getCfnResourceName('pg-write-host', this.env),
      stringValue: pgWriteInstance.dbInstanceEndpointAddress as string,
    });

    new StringParameter(this, getCfnResourceName('pg-dbname', this.env), {
      parameterName: getCfnResourceName('pg-dbname', this.env),
      stringValue: PG_DBNAME,
    });

    new StringParameter(this, getCfnResourceName('pg-port', this.env), {
      parameterName: getCfnResourceName('pg-port', this.env),
      stringValue: pgWriteInstance.dbInstanceEndpointPort as string,
    });

    pgReadInstances.forEach((replica, i) => {
      new StringParameter(this, getCfnResourceName(`pg-read-host-${i}`, this.env), {
        parameterName: getCfnResourceName(`pg-read-host-${i}`, this.env),
        stringValue: pgWriteInstance.dbInstanceEndpointAddress as string,
      });
    })
  }
}