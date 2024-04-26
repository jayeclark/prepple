import { App, Stage, StageProps } from "aws-cdk-lib";
import { DeploymentEnvironment } from "./utils/cfnUtils";

interface HoldingStageProps extends StageProps {
  deploymentEnvironments: DeploymentEnvironment[]
}

export class HoldingStage extends Stage {

  readonly scope: App;
  readonly props: HoldingStageProps;

  constructor(scope: App, id: string, props: HoldingStageProps) {
    super(scope, id, props)

    this.scope = scope;
    this.props = props;
  }
}