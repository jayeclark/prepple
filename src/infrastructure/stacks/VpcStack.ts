import { App, CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { Vpc, IpAddresses, SubnetType, FlowLog, FlowLogDestination, FlowLogTrafficType, FlowLogResourceType, SecurityGroup, CfnEIP, NatProvider, InstanceType } from "aws-cdk-lib/aws-ec2";
import { getCfnResourceName } from "../utils/cfnUtils";
import { DeploymentEnvironment } from "../utils/cfnUtils";
import { BlockPublicAccess, Bucket, BucketAccessControl, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";

interface VpcProps extends StackProps {
  deploymentEnvironment: DeploymentEnvironment
}

export class VpcStack extends Stack {
  public readonly vpc: Vpc
  public readonly elasticIPAddress: string

  constructor(scope: App, id: string, props: VpcProps) {
    super(scope, id, props)

    const natGatewayProvider = NatProvider.instance({
      instanceType: new InstanceType('t3.small'),
    });

    this.vpc = new Vpc(this, getCfnResourceName('Vpc', props.deploymentEnvironment), {
      ipAddresses: IpAddresses.cidr('10.192.0.0/16'),
      maxAzs: 1,
      natGatewayProvider,
      natGateways: 2,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      subnetConfiguration: [{
        cidrMask: 24,
        name: 'db',
        subnetType: SubnetType.PRIVATE_ISOLATED
      },{
        cidrMask: 24,
        name: 'backend',
        subnetType: SubnetType.PRIVATE_WITH_EGRESS
      },{
        cidrMask: 24,
        name: 'frontend',
        subnetType: SubnetType.PUBLIC
      }]
    })

    new CfnOutput(this, "VPCId", {
      value: this.vpc.vpcId,
      description: "My Dev Interview VPC ID",
      exportName: "MyDevInterviewVPCStack:vpcId"
    });

    const noInboundAllOutboundSecurityGroup = new SecurityGroup(this, getCfnResourceName("noInboundAllOutboundSecurityGroup", props.deploymentEnvironment), {
      vpc: this.vpc,
      allowAllOutbound: true,
      description: "No inbound / all outbound",
      securityGroupName: "noInboundAllOutboundSecurityGroup",
    })

    new CfnOutput(this, "noInboundAllOutboundSecurityGroup", {
      exportName: "noInboundAllOutboundSecurityGroup",
      value: noInboundAllOutboundSecurityGroup.securityGroupId,
    })

    const vpcLogBucket = new Bucket(this, "s3LogBucket", {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      versioned: true,
      accessControl: BucketAccessControl.LOG_DELIVERY_WRITE,
      encryption: BucketEncryption.S3_MANAGED,
      intelligentTieringConfigurations: [
        {
          name: "archive",
          archiveAccessTierTime: Duration.days(90),
          deepArchiveAccessTierTime: Duration.days(180),
        },
      ],
    })

    const vpcFlowLogRole = new Role(this, getCfnResourceName("vpcFlowLogRole", props.deploymentEnvironment), {
      assumedBy: new ServicePrincipal("vpc-flow-logs.amazonaws.com"),
    })
    vpcLogBucket.grantWrite(vpcFlowLogRole, "sharedVpcFlowLogs/*")

    this.createFlowLog(getCfnResourceName("sharedVpcFlowLogs", props.deploymentEnvironment), vpcLogBucket);

    // TODO:
    // - EIP?
    // - VPN gateway?
    // - Internet gateway?
    
    return this;
  }

  createFlowLog(uniqueResourceName: string, bucket: Bucket) {
    return new FlowLog(this, uniqueResourceName, {
      destination: FlowLogDestination.toS3(bucket, `${uniqueResourceName}/`),
      trafficType: FlowLogTrafficType.ALL,
      flowLogName: uniqueResourceName,
      resourceType: FlowLogResourceType.fromVpc(this.vpc),
    })
  }

  createAndAssignElasticIPAddress(deploymentEnvironment: DeploymentEnvironment) {
    const elasticIP = new CfnEIP(this, getCfnResourceName('frontend-eip', deploymentEnvironment));
    
    const hostedZone = new HostedZone(this, getCfnResourceName('app-hosted-zone', deploymentEnvironment), {
      zoneName: "mydevinterview.com"
    });

    new ARecord(this, getCfnResourceName('frontend-arecord', deploymentEnvironment), {
      zone: hostedZone,
      target: RecordTarget.fromIpAddresses(elasticIP.attrPublicIp)
    })
  }
}