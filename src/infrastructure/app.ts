import { App } from "aws-cdk-lib";
import { DeploymentPipeline } from "./DeploymentPipeline";

const app = new App();

const pipeline = new DeploymentPipeline(app, 'DeploymentPipeline', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})

app.synth();