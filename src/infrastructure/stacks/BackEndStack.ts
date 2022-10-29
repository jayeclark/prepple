import { App, CfnOutput, RemovalPolicy, Stack } from 'aws-cdk-lib';
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

    const { postgresWriteInstance, postgresReadReplicas, pgCredentials } = this.createPostgresDBResources(props.vpcStack.vpc, props.deploymentEnvironment);
    const pgReadEndpoints: Record<string, string> = {};
    postgresReadReplicas.forEach((replica, index) => {
      const key = `PG_READ_ENDPOINT_${index + 1}`;
      pgReadEndpoints[key] = replica.dbInstanceEndpointAddress;
    })
    const { docdbCluster, docdbCredentials } = this.createDocDBResources(props.vpcStack.vpc, props.deploymentEnvironment);

    const springApp = new Function(this, 'LambdaAPI', {
      runtime: Runtime.JAVA_11,
      handler: 'com.mydevinterview.api.StreamLambdaHandler::handleRequest',
      code: Code.fromAsset(path.join(__dirname, "../../backend")),
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

    const restAPI = new LambdaRestApi(this, `API-${props.deploymentEnvironment.stage}`, {
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
      instanceType: InstanceType.of(InstanceClass.BURSTABLE2, InstanceSize.SMALL),
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
        instanceType: InstanceType.of(InstanceClass.BURSTABLE2, InstanceSize.SMALL),
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
      instanceType: InstanceType.of(InstanceClass.BURSTABLE2, InstanceSize.SMALL),
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
}