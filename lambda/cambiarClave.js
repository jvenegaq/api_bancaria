exports.handler = async (event) => {
    const transaccion = JSON.parse(event.body);

    const transactionDB = {
        numeroCuenta: "123456",
        clave: 654321,
        estado: "completed",
        timestamp: new Date().toISOString()
    };

    const clave = transaccion.clave;

    if (transactionDB.clave != clave) {

        const nuevaclave = clave;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Cambio exitoso", nuevaclave })
        }

    }else{
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "No puede repetirse la clave" })
        }
    }

}