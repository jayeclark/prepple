import { App, Stack } from 'aws-cdk-lib';
import { DockerImageFunction, DockerImageCode } from "aws-cdk-lib/aws-lambda";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { getCfnResourceName, DeploymentEnvironment, getDomainName } from '../utils/cfnUtils';
import { DefaultCustomStackProps } from "../utils/types";
import { VpcStack } from './VpcStack';
import path = require('path');
import { CfnUserPoolClient, CfnUserPoolGroup, UserPool, VerificationEmailStyle } from 'aws-cdk-lib/aws-cognito';
import { FederatedPrincipal, Role, PolicyStatementProps, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { UserPoolGroupTypes, UserPoolGroupConfig } from '../config/userPoolConfig';
import { VIDEO_BUCKET_NAME, PHOTO_BUCKET_NAME, TRANSCRIPT_BUCKET_NAME, VIDEO_RESUME_BUCKET_NAME } from '../config/resourceNames';
import { AttributeType, GlobalSecondaryIndexProps, SchemaOptions, Table } from 'aws-cdk-lib/aws-dynamodb';

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
    const { ddbCoreTable } = this.createDdbResources(props.deploymentEnvironment);

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

    // User Pool & Client
    const { userPool, groups } = this.createUserPool(buckets);
    const userPoolClient = this.createUserPoolClient(userPool.userPoolId);

    // Quarkus
    const quarkusApp = new DockerImageFunction(this, getCfnResourceName("QuarkusApi", props.deploymentEnvironment), {
      code: DockerImageCode.fromImageAsset(path.join(__dirname, "../../backend-core"))
    })
    const quarkusRestAPI = new LambdaRestApi(this, getCfnResourceName("Backend-API-Quarkus", props.deploymentEnvironment), {
      handler: quarkusApp,
    })
    ddbCoreTable.grantReadWriteData(quarkusApp);

    this.createSSMParameters(userPool, userPoolClient, groups);

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

  createDdbResources(environment: DeploymentEnvironment) {
    const ddbCoreTable = this.createDynamoDbRelationalTable(environment);
    return { ddbCoreTable };
  }

  createDynamoDbTable(
    environment: DeploymentEnvironment,
    tableName: string,
    partitionKey: SchemaOptions["partitionKey"],
    sortKey?: SchemaOptions["sortKey"],
    secondaryIndexes?: GlobalSecondaryIndexProps[],
  ) {
    const persistenceLayer = new Table(this, tableName, {
      partitionKey,
      sortKey,
      tableName: getCfnResourceName(tableName, environment)
    })

    secondaryIndexes?.forEach(gsi => {
      const { indexName, partitionKey, sortKey } = gsi;
      persistenceLayer.addGlobalSecondaryIndex({
        indexName,
        partitionKey,
        sortKey,
      })
    })

    return persistenceLayer;
  }

  createDynamoDbRelationalTable(environment: DeploymentEnvironment) {
    const TABLE_NAME = "backend-core"
    const PARTITION_KEY: SchemaOptions["partitionKey"] = {
      name: "pk",
      type: AttributeType.STRING,
    }
    const SORT_KEY: SchemaOptions["sortKey"] = {
      name: "sk",
      type: AttributeType.STRING,
    }
    const GLOBAL_SECONDARY_INDEXES: GlobalSecondaryIndexProps[] = [
      {
        indexName: "gsi1",
        partitionKey: {
          name: "gsi1_pk",
          type: AttributeType.STRING
        },
        sortKey: {
          name: "gsi1_sk",
          type: AttributeType.STRING
        }
      },
      {
        indexName: "gsi2",
        partitionKey: {
          name: "gsi2_pk",
          type: AttributeType.STRING
        },
        sortKey: {
          name: "gsi2_sk",
          type: AttributeType.NUMBER
        }
      }
    ];

    return this.createDynamoDbTable(environment, TABLE_NAME, PARTITION_KEY, SORT_KEY, GLOBAL_SECONDARY_INDEXES)
  }

  createDynamoDbDocumentsTable(vpc: Vpc) {
    
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
      allowedOAuthScopes: ['aws.cognito.signin.user.admin', 'openid', 'email', 'profile'],
      allowedOAuthFlowsUserPoolClient: true,
      callbackUrLs: [getDomainName(this.env)],
      explicitAuthFlows: ['ALLOW_USER_PASSWORD_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH'],
      supportedIdentityProviders: ['COGNITO']
    })
  }

  createSSMParameters(
    userPool: UserPool,
    userPoolClient: CfnUserPoolClient,
    userPoolGroups: Record<string, {group: CfnUserPoolGroup, role: Role}>,
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
  }
}