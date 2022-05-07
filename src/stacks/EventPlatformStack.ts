import { App, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { getCfnResourceName } from "../utils/cfnUtils";
import { DefaultCustomStackProps } from "../utils/types";

export class EventPlatformStack extends Stack {
  constructor(scope: App, id: string, props: DefaultCustomStackProps) {
    super(scope, id, props)
    // Event Platform
    // - Ingests events from people doing things, fans out to relevant parties
    
    const placeholderBucket = new Bucket(
      this,
      getCfnResourceName('EventPlatformPlaceholderBucket', props.deploymentEnvironment),
      { removalPolicy: RemovalPolicy.DESTROY }
    );
  }
}