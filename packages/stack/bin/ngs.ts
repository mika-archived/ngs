#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/cdk";
import NgsStack from "../lib/ngs-stack";
import NgsUsEast1Stack from "../lib/ngs-us-east-1-stack";

/* eslint-disable no-new */
const app = new cdk.App();

// deploy to your default region
new NgsStack(app, "NgsStack");

// deploy to us-east-1
new NgsUsEast1Stack(app, "NgsUsEast1Stack", { env: { region: "us-east-1" } });
