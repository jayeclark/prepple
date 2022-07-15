import { StackProps } from "aws-cdk-lib";
import { DeploymentEnvironment } from "./cfnUtils";

export interface DefaultCustomStackProps extends StackProps {
  deploymentEnvironment: DeploymentEnvironment;
}