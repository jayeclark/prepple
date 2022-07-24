import { App, Stack } from "aws-cdk-lib";
import { getCfnResourceName } from "../utils/cfnUtils";
import { DefaultCustomStackProps } from "../utils/types";
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
import { DockerImageCode, DockerImageFunction } from "aws-cdk-lib/aws-lambda";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { FrontEnd } from "../utils/constants";
import { VpcStack } from "../../../build/stacks/VpcStack";
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";

interface FrontendStackProps extends DefaultCustomStackProps {
  vpcStack: VpcStack
}

export class FrontEndStack extends Stack {
  private readonly deploymentEnvironment;

  constructor(scope: App, id: string, props: FrontendStackProps) {
    super(scope, id, props)
    this.deploymentEnvironment = props.deploymentEnvironment;
    // Frontend

    const ecrRepository = this.createEcrRepository();
    const dockerImageAsset = this.buildDockerImageAsset();
    const lambdaVpc = Vpc.fromLookup(this, 'vpc', { vpcId: props.vpcStack.node.id })
    const frontEndLambda = new DockerImageFunction(this, getCfnResourceName('LambdaAsset', this.deploymentEnvironment), {
      code: DockerImageCode.fromEcr(ecrRepository),
      vpc: lambdaVpc,
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC
      }
    })

    
    // Account, Subscription, Practice, Plan, Share, Resume Builder, Custom Practice Sessions
    
  }

  createEcrRepository() {
    return new Repository(this, getCfnResourceName('frontend-ecr-repo', this.deploymentEnvironment), {
      repositoryName: getCfnResourceName('frontend-ecr-repo', this.deploymentEnvironment)
    });
  }

  buildDockerImageAsset() {
    return new DockerImageAsset(this, getCfnResourceName('frontend-ecr-asset', this.deploymentEnvironment), {
      directory: FrontEnd.DOCKER_IMAGE_ASSET_DIRECTORY,
    });
  }
}