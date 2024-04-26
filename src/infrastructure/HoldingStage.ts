import { App, Stack, StackProps, Stage, StageProps } from "aws-cdk-lib";
import { DeploymentEnvironment, getCfnResourceName } from "./utils/cfnUtils";
import { VpcStack } from "./stacks/VpcStack";
import { DefaultCustomStackProps } from "./utils/types";
import { DnsDelegatorStack } from "./stacks/DnsDelegatorStack";
import { env } from 'process';

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
    const dnsDelegatorStack = this.createStack(DnsDelegatorStack, props.deploymentEnvironments[0]);
  }

   createStack(StackConstruct: typeof Stack, environment: DeploymentEnvironment, options?: {
    stackName?: string,
    vpcStack?: VpcStack,
  }) {
    const uniqueStackName = getCfnResourceName(options?.stackName || StackConstruct.name, environment);
    
    const stackProps: DefaultCustomStackProps = {
      ...this.props as StackProps,
      deploymentEnvironment: environment,
      ...options
    }
    return new StackConstruct(this, uniqueStackName, {
      ...stackProps, env: {
        account: environment.accountId?.toString(),
        region: environment.region
    } })
  }
}