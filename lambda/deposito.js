const { sendEmail } = require('./email');
const mysql = require('mysql');

exports.handler = async (event) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'mydb'
    });

    const transaccion = JSON.parse(event.body.numeroCuenta);
    const objCuenta = connection.query(
        'SELECT * FROM cuenta WHERE numeroCuenta = ?',
        [transaccion.cuenta]
    );

    // Aquí va la lógica de depósito

    const emailResponse = await sendEmail(
        'Notificación de Depósito',
        'Se ha realizado un depósito correctamente.'
    );

    if (emailResponse.success) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Depósito realizado y notificación enviada" })
        };
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al enviar la notificación" })
        };
    }
};
