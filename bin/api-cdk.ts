#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ApiCdkStack } from '../lib/api-cdk-stack';

const app = new cdk.App();
new ApiCdkStack(app, 'ApiCdkStack', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
