import { App, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { getCfnResourceName } from "../utils/cfnUtils";
import { DefaultCustomStackProps } from "../utils/types";

export class ModelTrainingStack extends Stack {
  constructor(scope: App, id: string, props: DefaultCustomStackProps) {
    super(scope, id, props)
    // ML
    // - Trains daily on something, serves up model for backend to hit
    
    const placeholderBucket = new Bucket(
      this,
      getCfnResourceName('ModelTrainingPlaceholderBucket', props.deploymentEnvironment),
      { removalPolicy: RemovalPolicy.DESTROY }
    );

  }
}