const { connectToDatabase } = require('./db');

exports.handler = async (event) => {
    const numeroCuenta = event.queryStringParameters.numeroCuenta;
    const monto = event.queryStringParameters.monto;
    const connection = await connectToDatabase();

    await connection.execute(
        'UPDATE cuenta SET saldo = saldo - ? WHERE numeroCuenta = ? AND saldo >= ?',
        [monto, numeroCuenta, monto]
    );

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Retiro realizado correctamente" })
    };
};
