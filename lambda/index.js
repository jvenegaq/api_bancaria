exports.handler = async (event) => {
    const routeKey = event.routeKey;
    const routes = {
        "POST /cambiarClave": './cambiarClave',
        "POST /deposito": './deposito',
        "POST /retiro": './retiro',
        "POST /email": './email'
    };
  
    const route = routes[routeKey];
    if (route) {
        return await require(route).handler(event);
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Ruta no encontrada" })
        };
    }
  };
  