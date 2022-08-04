import { App, Stack, StackProps, Stage, StageProps } from "aws-cdk-lib";
import { VpcStack } from './stacks/VpcStack';
import { BackEndStack } from './stacks/BackEndStack';
import { EventPlatformStack } from './stacks/EventPlatformStack';
import { ModelTrainingStack } from './stacks/ModelTrainingStack';
import { FrontEndStack } from './stacks/FrontEndStack';
import { MonitoringStack } from './stacks/MonitoringStack';
import { DnsDelegatorStack } from "./stacks/DnsDelegatorStack";
import { AdminUIStack } from "./stacks/AdminUiStack";
import { DeploymentEnvironment, getCfnResourceName } from "./utils/cfnUtils";
import { DefaultCustomStackProps } from "./utils/types";
import { FrontEndDockerImageStack } from "./stacks/FrontEndDockerImageStack";

interface PipelineDeploymentStageProps extends StageProps {
  deploymentEnvironments: DeploymentEnvironment[]
}

export class PipelineDeploymentStage extends Stage {

  readonly scope: App;
  readonly props: PipelineDeploymentStageProps;

  constructor(scope: App, id: string, props: PipelineDeploymentStageProps) {
    super(scope, id, props)

    this.scope = scope;
    this.props = props;

    props.deploymentEnvironments.forEach((environment) => {
      const vpcStack = this.createStack(VpcStack, environment);

      const dnsDelegatorStack = this.createStack(DnsDelegatorStack, environment);

      const backendStack = this.createStack(BackEndStack, environment);
      backendStack.addDependency(vpcStack);
      backendStack.addDependency(dnsDelegatorStack);

      const frontEndDockerImageStack = this.createStack(FrontEndDockerImageStack, environment)

      const frontEndStack = this.createStack(FrontEndStack, environment, {
        vpcStack: vpcStack as VpcStack,
        dockerImageStack: frontEndDockerImageStack as FrontEndDockerImageStack
      });
      frontEndStack.addDependency(backendStack);
      frontEndStack.addDependency(frontEndDockerImageStack);

      const eventPlatformStack = this.createStack(EventPlatformStack, environment);
      eventPlatformStack.addDependency(backendStack);
      eventPlatformStack.addDependency(frontEndStack);

      const modelTrainingStack = this.createStack(ModelTrainingStack, environment);
      modelTrainingStack.addDependency(eventPlatformStack);

      const monitoringStack = this.createStack(MonitoringStack, environment);
      monitoringStack.addDependency(eventPlatformStack);

      const adminUIStack = this.createStack(AdminUIStack, environment)
      adminUIStack.addDependency(monitoringStack);
    })

  }

  createStack(StackConstruct: typeof Stack, environment: DeploymentEnvironment, options?: {
    stackName?: string,
    vpcStack?: VpcStack,
    dockerImageStack?: FrontEndDockerImageStack
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