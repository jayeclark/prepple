import { InstanceClass, InstanceSize, InstanceType } from "aws-cdk-lib/aws-ec2";
import { DatabaseInstanceEngine, PostgresEngineVersion } from "aws-cdk-lib/aws-rds";

export const PG_ENGINE = DatabaseInstanceEngine.postgres({ version: PostgresEngineVersion.VER_14_5 });
export const PG_WRITE_INSTANCE_TYPE = InstanceType.of(InstanceClass.T3, InstanceSize.MICRO);
export const PG_READ_INSTANCE_TYPE = InstanceType.of(InstanceClass.T3, InstanceSize.MICRO);
export const PG_MAX_ALLOCATED_STORAGE = 200;
export const PG_PORT = 5432;
export const PG_DBNAME = "prepple";

export const DOCDB_ENGINE = DatabaseInstanceEngine.postgres({ version: PostgresEngineVersion.VER_14_5 });
export const DOCDB_INSTANCE_TYPE = InstanceType.of(InstanceClass.T3, InstanceSize.MICRO);
export const DOCDB_READ_INSTANCE_COUNT = 1;