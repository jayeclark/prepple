import { App, Stack, StackProps } from "aws-cdk-lib";
import { Vpc, IpAddresses } from "aws-cdk-lib/aws-ec2";

export class VpcStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    const vpc = new Vpc(this, 'Vpc', {
      ipAddresses: IpAddresses.cidr('10.0.0.0/16')
    })

    // TODO:
    // - EIP?
    // - VPN gateway?
    // - Internet gateway?
    
  }
}