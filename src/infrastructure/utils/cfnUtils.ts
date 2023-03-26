import { DOMAIN_NAME, Domain, Realm, Region } from "./constants";

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

export function getDomainName({ realm, stage }: DeploymentEnvironment) {
  let subdomain = stage != Domain.PROD ? `${realm.toLowerCase()}-${stage.toLowerCase()}` : 'www';
  return `https://${subdomain}.${ DOMAIN_NAME } `;
}