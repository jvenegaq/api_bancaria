const { sendEmail } = require('./email');
const { clientes } = require('./data');

exports.handler = async (event) => {
    try {
        const numeroCuenta = event.queryStringParameters ? event.queryStringParameters.numeroCuenta : null;
        const monto = event.queryStringParameters ? parseFloat(event.queryStringParameters.monto) : null;

        if (!numeroCuenta || !monto) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "numeroCuenta y monto son requeridos" })
            };
        }

        const cliente = clientes.find(c => c.numeroCuenta === numeroCuenta);

        if (!cliente) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Cuenta no encontrada" })
            };
        }

        // Realizar el depósito
        cliente.saldo += monto;

        // Enviar la notificación por correo electrónico
        const emailResponse = await sendEmail(
            'Notificación de Depósito',
            'Se ha realizado un depósito correctamente.'
        );

        if (emailResponse.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Depósito realizado y notificación enviada / realizado por Julio Venegas" })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "Error al enviar la notificación", error: emailResponse.error })
            };
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error", error: error.message })
        };
    }
};
