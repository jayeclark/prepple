import { App, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { getCfnResourceName } from "../utils/cfnUtils";
import { DefaultCustomStackProps } from "../utils/types";


export class BackEndStack extends Stack {
  constructor(scope: App, id: string, props: DefaultCustomStackProps) {
    super(scope, id, props)

    const placeholderBucket = new Bucket(
      this,
      getCfnResourceName('BackendPlaceholderBucket', props.deploymentEnvironment),
      { removalPolicy: RemovalPolicy.DESTROY }
    );

    // Backend
    // - Serve lists of available videos to viewers
    // - Serve actual videos to viewers
    // - Save viewers videos to S3
    // - Cache viewers videos
    // - Serve video resumes to viewers
    // - Serve & record video ratings
    // - Serve & record planned answers
    // - Analyze videos
    // - Analyze planned answers
    // - Auth functions
    // - Subscription functions
  }
}