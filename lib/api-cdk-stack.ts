import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class ApiCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Funciones Lambda
        const cambiarClaveLambda = new lambda.Function(this, 'CambiarClaveLambda', {
            runtime: lambda.Runtime.NODEJS_20_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'cambiarClave.handler',
        });

        const depositoLambda = new lambda.Function(this, 'DepositoLambda', {
            runtime: lambda.Runtime.NODEJS_20_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'deposito.handler',
        });

        const retiroLambda = new lambda.Function(this, 'RetiroLambda', {
            runtime: lambda.Runtime.NODEJS_20_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'retiro.handler',
        });

        const emailLambda = new lambda.Function(this, 'EmailLambda', {
            runtime: lambda.Runtime.NODEJS_20_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'email.handler',  
        });

        const api = new apigateway.RestApi(this, 'API', {
            restApiName: 'ATM_api',
            description: 'Funciones de un cajero automático',
        });

        const cambiarClaveIntegration = new apigateway.LambdaIntegration(cambiarClaveLambda);
        api.root.addResource('cambiarClave').addMethod('GET', cambiarClaveIntegration);

        const depositoIntegration = new apigateway.LambdaIntegration(depositoLambda);
        api.root.addResource('deposito').addMethod('GET', depositoIntegration);

        const retiroIntegration = new apigateway.LambdaIntegration(retiroLambda);
        api.root.addResource('retiro').addMethod('GET', retiroIntegration);

        const emailIntegration = new apigateway.LambdaIntegration(emailLambda);
        api.root.addResource('email').addMethod('GET', emailIntegration);
    }
}
