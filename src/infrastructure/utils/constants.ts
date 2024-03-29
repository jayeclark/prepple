export enum Realm {
  FE = "fe",
  NA = "na",
  EU = "eu"
}

export enum Region {
  USWEST2 = "us-west-2",
  USEAST1 = "us-east-1",
  EUWEST1 = "eu-west-1"
}

export enum Domain {
  ALPHA = "alpha",
  BETA = "beta",
  HOLDING = "holding",
  GAMMA = "gamma",
  PROD = "prod"
}

export const FrontEnd = {
  DOCKER_IMAGE_ASSET_DIRECTORY: "./src/frontend"
}

export const BackendLinkAPI = {
  DOCKER_IMAGE_ASSET_DIRECTORY: './src/backend-links'
}

export const DOMAIN_NAME = "prepple.com";