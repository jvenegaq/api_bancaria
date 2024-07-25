const mysql = require('mysql2/promise');

const connectToDatabase = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Julio1981.',  // Asegúrate de tener la contraseña correcta
        database: 'mydb'
    });
};

module.exports = { connectToDatabase };
