const { cambiarClaveHandler } = require('./cambiarClave');
const { depositoHandler } = require('./deposito');
const { retiroHandler } = require('./retiro');
const { emailHandler } = require('./email');
const { dataHandler } = require('./data');

exports.handler = async (event) => {
    const path = event.path;

    if (path === '/cambiarClave' && event.httpMethod === 'GET') {
        return await cambiarClaveHandler(event);
    } else if (path === '/deposito' && event.httpMethod === 'GET') {
        return await depositoHandler(event);
    } else if (path === '/retiro' && event.httpMethod === 'GET') {
        return await retiroHandler(event);
    } else if (path === '/email' && event.httpMethod === 'GET') {
        return await emailHandler(event);
    } else if (path === '/data' && event.httpMethod === 'GET') {
        return await dataHandler(event);
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Not Found" })
        };
    }
};
