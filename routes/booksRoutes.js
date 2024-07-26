// 1- Importamos el módulo
const express = require("express");

// 2- Instanciamos Router de express
const router = express.Router();

// 3- Importamos el módulo propio bookController (a realizarlo a futuro)
const bookController = require('../controllers/bookController.js');

// 4- En bookController programaremos el módulo junto a métodos GET, POST, PUT, DELETE
// Dejaremos sólo la declaración de las rutas, con sus métodos 
// y el llamado al bookController con el método específico para cada opción 

// Ruta de listado en general
router.get('/', bookController.getAllBooks);
//Ruta para la consulta de libros por id
router.get('/:id', bookController.getBookById);

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'User not logged in' });
    }
};

//Ruta para crear un libro
router.post('/books', bookController.createLibro);
//Ruta para actualizar un libro
router.put('/:id', bookController.updateBook);
//Ruta para borrar una libro
router.delete('/:id', bookController.deleteBook);

//5- Exportamos el módulo
module.exports = router;