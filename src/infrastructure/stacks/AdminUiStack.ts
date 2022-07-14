import { App, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { getCfnResourceName } from "../utils/cfnUtils";
import { DefaultCustomStackProps } from "../utils/types";

export class AdminUIStack extends Stack {
  constructor(scope: App, id: string, props: DefaultCustomStackProps) {
    super(scope, id, props)
    // Special Admin & Debug UI
    // - Community & safety
    // - GDPR
    // - Ads
    // - Cookies
    const placeholderBucket = new Bucket(
      this,
      getCfnResourceName('AdminUIPlaceholderBucket', props.deploymentEnvironment),
      { removalPolicy: RemovalPolicy.DESTROY }
    );
  }
}