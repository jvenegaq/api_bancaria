const { sendEmail } = require('./email');
const { connectToDatabase } = require('./db');

exports.handler = async (event) => {
    const connection = await connectToDatabase();

    const transaccion = JSON.parse(event.body);
    const [rows] = await connection.execute(
        'SELECT * FROM cuenta WHERE numeroCuenta = ?',
        [transaccion.numeroCuenta]
    );

    if (rows.length > 0) {
        const objCuenta = rows[0];
        const nuevoSaldo = objCuenta.saldo + transaccion.monto;

        await connection.execute(
            'UPDATE cuenta SET saldo = ? WHERE numeroCuenta = ?',
            [nuevoSaldo, transaccion.numeroCuenta]
        );

        const emailResponse = await sendEmail(
            'Notificación de Depósito',
            'Se ha realizado un depósito correctamente.'
        );

        return {
            statusCode: emailResponse.success ? 200 : 500,
            body: JSON.stringify({ message: emailResponse.success ? "Depósito realizado y notificación enviada" : "Error al enviar la notificación" })
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Cuenta no encontrada" })
        };
    }
};
