const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

exports.handler = async (event) => {
    // Invocar a la primera lambda para obtener la respuesta de la transacción
    const params = {
        FunctionName: 'LambdaDatabase', // Nombre de la lambda
        InvocationType: 'RequestResponse' // Esperar la respuesta
    };

    try {
        const response = await lambda.invoke(params).promise();
        const transactionResponse = JSON.parse(response.Payload);

        // Armar la respuesta para el API Gateway
        const apiResponse = {
            statusCode: 200,
            body: JSON.stringify(transactionResponse)
        };

        return apiResponse;
    } catch (error) {
        // Manejar errores
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error interno del servidor" })
        };
    }
};
