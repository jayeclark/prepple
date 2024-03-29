import { App, Stack, StackProps } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineDeploymentStage } from './PipelineDeploymentStage';

import { PipelineStageConfig, stages } from './config/stageConfig';

export class DeploymentPipeline extends Stack {
  readonly context: App;
  readonly props?: StackProps;

  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props);
    
    this.context = scope;
    this.props = props;

    const pipeline = new CodePipeline(this, 'Pipeline', {
      crossAccountKeys: true,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('jayeclark/prepple', 'main', {
          connectionArn: `arn:aws:codestar-connections:us-west-2:${process.env.AWS_ACCOUNT_ID}:connection/d0c1c474-baaf-44e6-b4dd-ee755ed47cd9`,
        }),
        commands: [
          'npm install',
          'npm run test:unit',
          'npm run test:integration',
          'npm run build',
          'npx cdk synth',
        ],
        primaryOutputDirectory: './cdk.out',
      }),
    });

    stages.filter(isNotFeatureFlagged).forEach((stageConfig: PipelineStageConfig) => {
      this.addStageToPipeline(pipeline, stageConfig)
    })

  }

  addStageToPipeline(pipeline: CodePipeline, {name, environments, preDeploymentApprovalSteps, postDeploymentApprovalSteps}: PipelineStageConfig) {
    const pipelineStage = pipeline.addStage(new PipelineDeploymentStage(this.context, name, { deploymentEnvironments: environments }));
    preDeploymentApprovalSteps?.forEach((preDeploymentApprovalStep) => pipelineStage.addPre(preDeploymentApprovalStep));
    postDeploymentApprovalSteps?.forEach((postDeploymentApprovalStep) => pipelineStage.addPost(postDeploymentApprovalStep));
  }
}

function isNotFeatureFlagged(stage: PipelineStageConfig) {
  return !stage.featureFlagged
}
