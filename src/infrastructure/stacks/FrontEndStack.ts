import { App, Stack } from "aws-cdk-lib";
import { getCfnResourceName } from "../utils/cfnUtils";
import { DefaultCustomStackProps } from "../utils/types";
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
import { DockerImageCode, DockerImageFunction } from "aws-cdk-lib/aws-lambda";
import { FrontEnd } from "../utils/constants";
import { VpcStack } from "../stacks/VpcStack";
import { IVpc, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";

interface FrontendStackProps extends DefaultCustomStackProps {
  vpcStack: VpcStack
}

export class FrontEndStack extends Stack {
  private readonly deploymentEnvironment;

  constructor(scope: App, id: string, props: FrontendStackProps) {
    super(scope, id, props)
    this.deploymentEnvironment = props.deploymentEnvironment;
    // Frontend

    const lambdaVpc: IVpc = props.vpcStack.vpc
    const frontEndLambda = new DockerImageFunction(this, getCfnResourceName('LambdaAsset', this.deploymentEnvironment), {
      code: DockerImageCode.fromImageAsset(FrontEnd.DOCKER_IMAGE_ASSET_DIRECTORY),
      vpc: lambdaVpc,
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE_WITH_EGRESS
      }
    })

    
    // Account, Subscription, Practice, Plan, Share, Resume Builder, Custom Practice Sessions
    
  }

  buildDockerImageAsset() {
    return new DockerImageAsset(this, getCfnResourceName('frontend-ecr-asset', this.deploymentEnvironment), {
      directory: FrontEnd.DOCKER_IMAGE_ASSET_DIRECTORY,
    });
  }
}