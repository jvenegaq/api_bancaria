// db.js
const mysql = require('mysql2/promise');

const connectToDatabase = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'mydb'
    });
};

module.exports = { connectToDatabase };
