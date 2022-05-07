import { App } from "aws-cdk-lib";
import { DeploymentPipeline } from "./DeploymentPipeline";

const app = new App();

const pipeline = new DeploymentPipeline(app, 'DeploymentPipeline', {})

app.synth();