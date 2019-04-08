import * as path from "path";

import * as cdk from "@aws-cdk/cdk";
import * as lambda from "@aws-cdk/aws-lambda";

export default class NgsUsEast1Stack extends cdk.Stack {
  // eslint-disable-next-line no-useless-constructor
  public constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // eslint-disable-next-line no-new
    new lambda.LayerVersion(this, "NgsSharedLayer", {
      code: lambda.Code.directory(path.join(__dirname, "..", "..", "lambda-layers")),
      compatibleRuntimes: [lambda.Runtime.NodeJS810],
      license: "MIT",
      description: "A Lambda Layer for ngs functions"
    });
  }
}
