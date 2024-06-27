import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as iam from '@aws-cdk/aws-iam';

export class ApiCdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Crear un rol para Lambda con permisos para SES
        const lambdaRole = new iam.Role(this, 'LambdaRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        });

        lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSESFullAccess'));

        // Función Lambda para cambiar clave
        const cambiarClaveLambda = new lambda.Function(this, 'CambiarClaveHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('path/to/cambiarClave'),
            handler: 'cambiarClave.handler',
            role: lambdaRole,
        });

        // Función Lambda para depósito
        const depositoLambda = new lambda.Function(this, 'DepositoHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('path/to/deposito'),
            handler: 'deposito.handler',
            role: lambdaRole,
        });

        // Función Lambda para retiro
        const retiroLambda = new lambda.Function(this, 'RetiroHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('path/to/retiro'),
            handler: 'retiro.handler',
            role: lambdaRole,
        });

        // API Gateway
        const api = new apigateway.RestApi(this, 'api', {
            restApiName: 'Mi Servicio',
            description: 'Este servicio maneja depósitos, retiros y cambios de clave.'
        });

        // Recursos y métodos de API Gateway
        const cambiarClaveResource = api.root.addResource('cambiarClave');
        cambiarClaveResource.addMethod('POST', new apigateway.LambdaIntegration(cambiarClaveLambda));

        const depositoResource = api.root.addResource('deposito');
        depositoResource.addMethod('POST', new apigateway.LambdaIntegration(depositoLambda));

        const retiroResource = api.root.addResource('retiro');
        retiroResource.addMethod('POST', new apigateway.LambdaIntegration(retiroLambda));
    }
}
