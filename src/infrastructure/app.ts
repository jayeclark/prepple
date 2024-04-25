import { App } from "aws-cdk-lib";
import { DeploymentPipeline } from "./DeploymentPipeline";

const app = new App();

const pipeline = new DeploymentPipeline(app, 'DeploymentPipeline', {
  env: {
    account: "541563788130",
    region: "us-west-2"
  }
})

app.synth();