exports.handler = async (event) => {
    const transaccion = JSON.parse(event.body);

    const transactionDB = {
        numeroCuenta: "123456",
        monto: 100.00,
        estado: "completed",
        timestamp: new Date().toISOString()
    };

    const monto = transaccion.monto;

    if (transactionDB.monto < monto) {

        const saldo = transactionDB.monto - monto;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Retiro exitoso", saldo })
        }

    }else{
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "No tiene suficiente saldo" })
        }
    }

}