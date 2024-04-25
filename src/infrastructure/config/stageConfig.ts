import { ManualApprovalStep, Step } from "aws-cdk-lib/pipelines";
import { DeploymentEnvironment } from "../utils/cfnUtils";
import { Domain, Realm, Region } from "../utils/constants";

export interface PipelineStageConfig {
  name: Domain;
  environments: DeploymentEnvironment[];
  preDeploymentApprovalSteps?: Step[];
  postDeploymentApprovalSteps?: Step[];
  featureFlagged?: boolean;
}

const DEFAULT_ACCOUNT_ID = 541563788130;

const alphaEnvironment: DeploymentEnvironment = {
  accountId: DEFAULT_ACCOUNT_ID,
  realm: Realm.FE,
  region: Region.USWEST2,
  stage: Domain.ALPHA,
  user: process.env.USER
}

const betaEnvironment: DeploymentEnvironment = {
  accountId: DEFAULT_ACCOUNT_ID,
  realm: Realm.FE,
  region: Region.USWEST2,
  stage: Domain.BETA,
}

const gammaEnvironmentNA: DeploymentEnvironment = {
  accountId: DEFAULT_ACCOUNT_ID,
  realm: Realm.NA,
  region: Region.USEAST1,
  stage: Domain.GAMMA,
}

const gammaEnvironmentEU: DeploymentEnvironment = {
  accountId: DEFAULT_ACCOUNT_ID,
  realm: Realm.EU,
  region: Region.EUWEST1,
  stage: Domain.GAMMA,
}

const prodEnvironmentNA: DeploymentEnvironment = {
  accountId: DEFAULT_ACCOUNT_ID,
  realm: Realm.NA,
  region: Region.USEAST1,
  stage: Domain.PROD
}

const prodEnvironmentEU: DeploymentEnvironment = {
  accountId: DEFAULT_ACCOUNT_ID,
  realm: Realm.EU,
  region: Region.EUWEST1,
  stage: Domain.PROD
}



export const stages: PipelineStageConfig[] = [
  {
    name: Domain.ALPHA,
    environments: [alphaEnvironment],
    featureFlagged: true,
  },
  { 
    name: Domain.BETA,
    environments: [betaEnvironment], // TODO: Add integ & e2e test post deployment steps
  },
  { 
    name: Domain.HOLDING,
    environments: [betaEnvironment],
    postDeploymentApprovalSteps: [
      new ManualApprovalStep('PromoteToGamma')
    ]
  },
  {
    name: Domain.GAMMA,
    environments: [gammaEnvironmentEU, gammaEnvironmentNA],
    featureFlagged: true,
  },
  {
    name: Domain.PROD,
    environments: [prodEnvironmentEU, prodEnvironmentNA],
    featureFlagged: true,
    preDeploymentApprovalSteps: [
      new ManualApprovalStep('PromoteToProd') // TODO: Replace with a shell script bake time test
    ]
  }
];