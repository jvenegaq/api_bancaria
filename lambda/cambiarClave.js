const { sendEmail } = require('./email');
const { connectToDatabase } = require('./db');

exports.handler = async (event) => {
    const numeroCuenta = event.queryStringParameters.numeroCuenta;
    const nuevaClave = event.queryStringParameters.nuevaClave;
    const connection = await connectToDatabase();

    await connection.execute(
        'UPDATE cuenta SET clave = ? WHERE numeroCuenta = ?',
        [nuevaClave, numeroCuenta]
    );

    const emailResponse = await sendEmail(
        'Notificación de Cambio de Clave',
        'Se ha cambiado la clave correctamente.'
    );

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Cambio de clave realizado y notificación enviada" })
    };
};
