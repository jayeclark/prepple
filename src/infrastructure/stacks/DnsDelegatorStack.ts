import { App, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { getCfnResourceName } from "../utils/cfnUtils";
import { DefaultCustomStackProps } from "../utils/types";

export class DnsDelegatorStack extends Stack {
  constructor(scope: App, id: string, props: DefaultCustomStackProps) {
    super(scope, id, props)

    const placeholderBucket = new Bucket(
      this,
      getCfnResourceName('DnsDelegatorPlaceholderBucket', props.deploymentEnvironment),
      { removalPolicy: RemovalPolicy.DESTROY }
    );
  }
}