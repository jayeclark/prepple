import { Domain, Realm, Region } from "./constants";

export interface DeploymentEnvironment {
  accountId?: number;
  realm: Realm;
  region: Region;
  stage: Domain;
  user?: string;
}

export function getCfnResourceName(resourceName: string, environment: DeploymentEnvironment) {
  const { realm, stage, user } = environment;
  return `${resourceName}-${realm.toString()}-${stage}${user ? `-${user}`:''}`
} 