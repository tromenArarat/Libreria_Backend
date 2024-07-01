/*
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'books_db'
});

connection.connect((err)=>{
    err?console.error("Error conectando a la base de datos", err):console.log("Conectado a la base de datos mysql");
});

module.exports = connection;
*/
// 1 | Importamos el módulo mysql2
const mysql = require('mysql2');

// 2 | Configuramos la conexión
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    port: process.env.MYSQLPORT
});

// 3 | Conectamos
connection.connect((err)=>{
    if(err){
        console.error("Error de conexión: "+err);
        return;
    }
    // Si todo va bien
    console.log("Estado de la conexión: CONECTADA");
    // Creamos una consulta verificando la bbdd y si no existe la creamos
    connection.query('CREATE DATABASE IF NOT EXISTS '+process.env.DBNAME, (err,results)=>{
        if(err){
            console.error('Error creating database: ',err);
            return;
        }
        console.log('Base de datos asegurada');

        connection.changeUser({database: process.env.DBNAME},(err)=>{
            if(err){
                console.error('Error cambiando a '+process.env.DBNAME,err);
                return;
            }
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS libros (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    autor VARCHAR(255) NOT NULL,
                    year INT NOT NULL,
                    tapa VARCHAR(255) NOT NULL
                    );
                `;
                connection.query(createTableQuery, (err,results)=>{
                    if(err){
                        console.error('Error creando tabla: ',err);
                        return;
                    }
                    console.log('Tabla libros asegurada');
                });
            });
            const createTableQuery2 = `
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    clave VARCHAR(255) NOT NULL,
                    mail VARCHAR(255) NOT NULL UNIQUE
                    );
                `;
                connection.query(createTableQuery2, (err,results)=>{
                    if(err){
                        console.error('Error creando tabla: ',err);
                        return;
                    }
                    console.log('Tabla usuarios asegurada');
                });
            });
    });
module.exports = connection;
