import { App, Stack, StackProps } from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep, StageDeployment } from 'aws-cdk-lib/pipelines';
import { PipelineDeploymentStage } from './PipelineDeploymentStage';

import { PipelineStageConfig, stages } from './config/stageConfig';
import { BuildSpec } from 'aws-cdk-lib/aws-codebuild';
import { Domain } from './utils/constants';
import { HoldingStage } from './HoldingStage';

export class DeploymentPipeline extends Stack {
  readonly context: App;
  readonly props?: StackProps;

  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props);
    
    this.context = scope;
    this.props = props;

    const account = 541563788130;

    const pipeline = new CodePipeline(this, 'Pipeline', {
      crossAccountKeys: true,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('jayeclark/prepple', 'main', {
          connectionArn: `arn:aws:codestar-connections:us-west-2:${account}:connection/d0c1c474-baaf-44e6-b4dd-ee755ed47cd9`,
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
      synthCodeBuildDefaults: {
        partialBuildSpec: BuildSpec.fromObject({
            phases: {
              install: {
                    "runtime-versions": {
                      nodejs: "18",
                      java: "corretto21"
                    }
              },
              build: {
                env: {
                  environmentVariables: {
                    'AWS_ACCOUNT_ID': process.env.AWS_ACCOUNT_ID,
                    'AWS_ACCESS_KEY_ID': process.env.AWS_ACCESS_KEY_ID,
                    'AWS_SECRET_ACCESS_KEY': process.env.AWS_SECRET_ACCESS_KEY,
                    'CDK_DEFAULT_ACCOUNT': process.env.CDK_DEFAULT_ACCOUNT,
                    'CDK_DEFAULT_REGION': process.env.CDK_DEFAULT_REGION
                    }
                  }
              }
                
            }
        })
      }
    });

    const stripAssetsStep = new CodeBuildStep(
      'StripAssetsFromAssembly', {
              input: pipeline.cloudAssemblyFileSet,
            commands: [
                'S3_PATH=${CODEBUILD_SOURCE_VERSION#"arn:aws:s3:::"}',
                'ZIP_ARCHIVE=$(basename $S3_PATH)',
                'rm -rfv asset.*',
                'zip -r -q -A $ZIP_ARCHIVE *',
                'aws s3 cp $ZIP_ARCHIVE s3://$S3_PATH',
            ],
            }
        )
    pipeline.addWave('BeforeDeploy', { pre: [stripAssetsStep] })

    stages.filter(isNotFeatureFlagged).forEach((stageConfig: PipelineStageConfig) => {
      this.addStageToPipeline(pipeline, stageConfig)
    })

  }

  addStageToPipeline(pipeline: CodePipeline, { name, environments, preDeploymentApprovalSteps, postDeploymentApprovalSteps }: PipelineStageConfig) {
    let pipelineStage: StageDeployment;
    if (name == Domain.HOLDING) {
      pipelineStage = pipeline.addStage(new HoldingStage(this.context, name, { deploymentEnvironments: environments }))
    } else {
      pipelineStage = pipeline.addStage(new PipelineDeploymentStage(this.context, name, { deploymentEnvironments: environments }));
    }
    preDeploymentApprovalSteps?.forEach((preDeploymentApprovalStep) => pipelineStage.addPre(preDeploymentApprovalStep));
    postDeploymentApprovalSteps?.forEach((postDeploymentApprovalStep) => pipelineStage.addPost(postDeploymentApprovalStep));
  }
}

function isNotFeatureFlagged(stage: PipelineStageConfig) {
  return !stage.featureFlagged
}
