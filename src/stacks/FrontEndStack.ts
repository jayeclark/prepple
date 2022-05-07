import { App, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { getCfnResourceName } from "../utils/cfnUtils";
import { DefaultCustomStackProps } from "../utils/types";

export class FrontEndStack extends Stack {
  constructor(scope: App, id: string, props: DefaultCustomStackProps) {
    super(scope, id, props)
    // Frontend

    const placeholderBucket = new Bucket(
      this,
      getCfnResourceName('FrontendPlaceholderBucket', props.deploymentEnvironment),
      { removalPolicy: RemovalPolicy.DESTROY }
    );
    // Account, Suscription, Practice, Plan, Share, Resume Builder, Custom Practice Sessions
    
  }
}