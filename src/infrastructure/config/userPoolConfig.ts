import { Effect, PolicyStatementProps } from "aws-cdk-lib/aws-iam"

export enum UserPoolGroupTypes {
  FREEMIUM = "Freemium",
  SUBSCRIPTION = "Subscription",
  ADMIN = "Admin",
  SUPERADMIN = "Superadmin"
}

const freemiumConfig: PolicyStatementProps[] = [{
  effect: Effect.ALLOW,
  actions: ['s3:GetObject', 's3:PutObject'],
  resources: [
    'arn:aws:s3:::{{videoBucket}}/public/*', // Public videos owned by any user
    'arn:aws:s3:::{{photoBucket}}/*'] // Profile photos of users
}, {
  effect: Effect.ALLOW,
  actions: ['s3:PutObject', 's3:GetObject', 's3:ListBucket'],
  resources: [
    'arn:aws:s3:::{{videoBucket}}/private/*', // Private videos owned by user
    'arn:aws:s3:::{{transcriptsBucket}}/*'], // Transcripts of users' videos
  conditions: {
    "StringEquals": {
      "s3:x-amz-owner-id": "${cognito-identity.amazonaws.com:sub}"
    }
  }
  }]

const subscriptionConfig: PolicyStatementProps[] = [
  ...freemiumConfig,
  {
    effect: Effect.ALLOW,
    actions: ['s3:PutObject'],
    resources: [
      'arn:aws:s3:::{{videoResumeBucket}}/${cognito-identity.amazonaws.com:sub}/*',] // Video resumes
  }];

const adminConfig: PolicyStatementProps[] = [{
  effect: Effect.ALLOW,
  actions: ['s3:GetObject', 's3:PutObject', 's3:ListBucket'],
  resources: [
    'arn:aws:s3:::{{videoBucket}}/public/*', // Public videos owned by any user
    'arn:aws:s3:::{{photoBucket}}/*', // Profile photos of users
    'arn:aws:s3:::{{videoBucket}}/private/*', // Private videos owned by user
    'arn:aws:s3:::{{transcriptBucket}}/*'] // Transcripts of users' videos
}];

const superadminConfig: PolicyStatementProps[] = [
  ...adminConfig
];

export const UserPoolGroupConfig = {
  [UserPoolGroupTypes.FREEMIUM]: freemiumConfig,
  [UserPoolGroupTypes.SUBSCRIPTION]: subscriptionConfig,
  [UserPoolGroupTypes.ADMIN]: adminConfig,
  [UserPoolGroupTypes.SUPERADMIN]: superadminConfig,
}