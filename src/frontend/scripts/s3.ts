import AWS from "aws-sdk"

const AWSConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
}
AWS.config.update(AWSConfig);
export const s3 = new AWS.S3()

export function uploadToS3(file: File) {
  return s3.putObject({ 
    Bucket: 'mydevinterview-videos',
    Key: file.name,
    Body: file
  }).promise()
}