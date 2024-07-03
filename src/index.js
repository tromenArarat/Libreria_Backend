
//1- Importamos express
const express = require('express');

const cors = require('cors');

// Carga las variables de entorno 
require('dotenv').config();

//2- Instanciamos express
const app = express();

// app.options('*', cors());

//3- Importamos el módulo movieRoutes (se lo diseñará a futuro)
const bookRoutes = require('../routes/booksRoutes.js');

const authRoutes = require('../routes/authRoutes.js');
const tematicasRoutes = require('../routes/tematicasRoutes.js');

//4- Declaramos el puerto
const PORT = process.env.PORT || 3000; 

//5- Uso del middleware .json que convierte el cuerpo de solicitud
// en algo accesible por js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin',"https://tromenararat.github.io");
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   res.header('Access-Control-Allow-Credentials', 'true');

   next();
});

// app.use(cors({ 
//    origin: [ process.env.CROSSORIGIN], 
//    methods: ["GET", "POST", "PUT", "DELETE"],
//    allowedHeaders: ['Content-Type', 'Authorization'], 
//    credentials: true }));

//6- Prefijo principal de las rutas y delegación de las sub-rutas
app.use('/books', bookRoutes);
app.use('/auth', authRoutes);
app.use('/tematicas', tematicasRoutes);

/*

app.get("/",(req,res)=>{
   res.send("Deploy probando...")
})
*/

//7- Iniciamos el servidor
app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`);
});

//8- Pasamos a configurar el router
