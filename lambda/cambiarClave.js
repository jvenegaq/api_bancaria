const { sendEmail } = require('./email');

exports.handler = async (event) => {
    const transaccion = JSON.parse(event.body);

    const transactionDB = {
        numeroCuenta: "123456",
        clave: 654321,
        estado: "completed",
        timestamp: new Date().toISOString()
    };

    const emailResponse = await sendEmail(
        'Notificación de Cambio de Clave',
        'Se ha cambiado la clave correctamente.'
    );

    if (emailResponse.success) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Cambio de clave realizado y notificación enviada" })
        };
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al enviar la notificación" })
        };
    }
};
