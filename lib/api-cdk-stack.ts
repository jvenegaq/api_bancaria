import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ses from 'aws-cdk-lib/aws-ses';
import * as sesActions from 'aws-cdk-lib/aws-ses-actions';
import { Construct } from 'constructs';

export class ApiCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Definir las funciones Lambda
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
            handler: 'email.sendEmail',
        });

    
        const api = new apigateway.RestApi(this, 'API', {
            restApiName: 'My Service',
            description: 'This service serves my functions.',
        });

        const cambiarClaveIntegration = new apigateway.LambdaIntegration(cambiarClaveLambda);
        api.root.addResource('cambiarClave').addMethod('POST', cambiarClaveIntegration);

        const depositoIntegration = new apigateway.LambdaIntegration(depositoLambda);
        api.root.addResource('deposito').addMethod('POST', depositoIntegration);

        const retiroIntegration = new apigateway.LambdaIntegration(retiroLambda);
        api.root.addResource('retiro').addMethod('POST', retiroIntegration);

        const emailIntegration = new apigateway.LambdaIntegration(emailLambda);
        api.root.addResource('email').addMethod('POST', emailIntegration);

        const emailIdentity1 = new ses.CfnEmailIdentity(this, 'VerifiedEmailIdentity1', {
            emailIdentity: 'jvenegaq@gmail.com'
        });

        const emailIdentity2 = new ses.CfnEmailIdentity(this, 'VerifiedEmailIdentity2', {
            emailIdentity: 'jevenegas1@utpl.edu.ec'
        });
    }
}
