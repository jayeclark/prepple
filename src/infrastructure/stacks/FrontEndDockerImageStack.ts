import { App, Stack } from "aws-cdk-lib";
import { getCfnResourceName } from "../utils/cfnUtils";
import { DefaultCustomStackProps } from "../utils/types";
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
import { FrontEnd } from "../utils/constants";

interface FrontEndDockerImageProps extends DefaultCustomStackProps {
  dockerImageAsset: DockerImageAsset
}

export class FrontEndDockerImageStack extends Stack {
  private readonly deploymentEnvironment;
  public readonly imageAsset: DockerImageAsset;

  constructor(scope: App, id: string, props: FrontEndDockerImageProps) {
    super(scope, id, props)
    this.deploymentEnvironment = props.deploymentEnvironment;
    // Frontend

    this.imageAsset = new DockerImageAsset(this, getCfnResourceName('frontend-ecr-asset', this.deploymentEnvironment), {
      directory: FrontEnd.DOCKER_IMAGE_ASSET_DIRECTORY,
    });

    return this;
  }
}