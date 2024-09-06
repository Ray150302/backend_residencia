const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config();

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

const getConnection = async () => await connection;

module.exports = {
    getConnection
};
