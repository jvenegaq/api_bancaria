const { handler: cambiarClaveHandler } = require('./cambiarClave');
const { handler: depositoHandler } = require('./deposito');
const { handler: retiroHandler } = require('./retiro');
const { sendEmail } = require('./email');
const { handler: dataHandler } = require('./data');

exports.handler = async (event) => {
    const path = event.path;

    if (path === '/cambiarClave' && event.httpMethod === 'GET') {
        return await cambiarClaveHandler(event);
    } else if (path === '/deposito' && event.httpMethod === 'GET') {
        return await depositoHandler(event);
    } else if (path === '/retiro' && event.httpMethod === 'GET') {
        return await retiroHandler(event);
    } else if (path === '/email' && event.httpMethod === 'GET') {
        const emailResponse = await sendEmail('Test Email', 'Este es un email de prueba.');
        if (emailResponse.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Email enviado correctamente' })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error al enviar el email', error: emailResponse.error })
            };
        }
    } else if (path === '/data' && event.httpMethod === 'GET') {
        return await dataHandler(event);
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Not Found" })
        };
    }
};
