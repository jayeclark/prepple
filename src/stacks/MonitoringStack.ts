import { App, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { getCfnResourceName } from "../utils/cfnUtils";
import { DefaultCustomStackProps } from "../utils/types";

export class MonitoringStack extends Stack {
  constructor(scope: App, id: string, props: DefaultCustomStackProps) {
    super(scope, id, props)

    // Monitoring
    // - General service health
    // - User experience
    // - Business dimensions
    // - Behavior
    const placeholderBucket = new Bucket(
      this,
      getCfnResourceName('MonitoringStackPlaceholderBucket', props.deploymentEnvironment),
      { removalPolicy: RemovalPolicy.DESTROY }
    );
  }
}