import { App, Stack } from "aws-cdk-lib";
import { DefaultCustomStackProps } from "../utils/types";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { DeploymentEnvironment, getCfnResourceName } from "../utils/cfnUtils";
import { DDB_PARTITION_KEY, GLOBAL_SECONDARY_INDEX_KEY } from '../config/backendLinksStackConfig';
import { DockerImageCode, DockerImageFunction } from "aws-cdk-lib/aws-lambda";
import { BackendLinkAPI } from "../utils/constants";
import { VpcStack } from "./VpcStack";
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
import { IVpc, SubnetType } from "aws-cdk-lib/aws-ec2";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";

interface BackendLinksStackProps extends DefaultCustomStackProps {
  vpcStack: VpcStack
}

export class BackendLinksStack extends Stack {
  private deploymentEnvironment: DeploymentEnvironment;

  constructor(scope: App, id: string, props: BackendLinksStackProps) {
    super(scope, id, props);

    // DynamoDB table
    const persistenceLayer = new Table(this, getCfnResourceName("prepple-urls", props.deploymentEnvironment), {
      partitionKey: {
        name: DDB_PARTITION_KEY,
        type: AttributeType.STRING
      }
    })
    persistenceLayer.addGlobalSecondaryIndex({
      indexName: GLOBAL_SECONDARY_INDEX_KEY,
      partitionKey: {
        name: GLOBAL_SECONDARY_INDEX_KEY,
        type: AttributeType.STRING
      }
    })

    // Lambda for Golang API
    const lambdaVpc: IVpc = props.vpcStack.vpc;
    const apiLambda = new DockerImageFunction(this, getCfnResourceName('UrlLambdaAPI', props.deploymentEnvironment), {
      memorySize: 256,
      code: DockerImageCode.fromImageAsset(BackendLinkAPI.DOCKER_IMAGE_ASSET_DIRECTORY),
      vpc: lambdaVpc,
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE_WITH_EGRESS
      }
    })
    persistenceLayer.grantReadWriteData(apiLambda);

    // Allow lambda to access DDB table
    // API Gateway
    const restAPI = new LambdaRestApi(this, getCfnResourceName('BackendLinks-API', props.deploymentEnvironment), {
      handler: apiLambda,
    })
  }

  buildDockerImageAsset() {
    return new DockerImageAsset(this, getCfnResourceName('frontend-ecr-asset', this.deploymentEnvironment), {
      directory: BackendLinkAPI.DOCKER_IMAGE_ASSET_DIRECTORY,
    });
  }
}