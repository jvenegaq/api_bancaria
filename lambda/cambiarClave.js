const { sendEmail } = require('./email');
const { connectToDatabase } = require('./db');

exports.handler = async (event) => {
    const transaccion = JSON.parse(event.body);
    const connection = await connectToDatabase();

    await connection.execute(
        'UPDATE cuenta SET clave = ? WHERE numeroCuenta = ?',
        [transaccion.nuevaClave, transaccion.numeroCuenta]
    );

    const emailResponse = await sendEmail(
        'Notificación de Cambio de Clave',
        'Se ha cambiado la clave correctamente.'
    );

    return {
        statusCode: emailResponse.success ? 200 : 500,
        body: JSON.stringify({ message: emailResponse.success ? "Cambio de clave realizado y notificación enviada" : "Error al enviar la notificación" })
    };
};
