const db = require('../db/db');

//2- Método para obtener todos los libros
const getAllBooks = (req, res) => {
    const sql = `SELECT 
                    libros.*,
                    tematica.name AS tematica_name
                FROM 
                    libros
                JOIN 
                    tematica ON libros.tematica_id = tematica.tematica_id
                `;

    db.query(sql, (err, results) => {
        if (err) {console.log(err);
            return;} 
        res.json(results);
    });
};

const getBookById = (req, res) => {
    // Tomamos la solicitud y extraemos su id
    // por desestructuración {id}
    // En la req viaja /books/1, la expresion {id} estrae el nro 1 de la ruta
    // y la almacena dentro de la variable id
    const { id } = req.params;

    // Creamos la consulta con marcador de posición
    // ¡¡¡
    const sql = 'SELECT * FROM libros WHERE id = ?';

    // Los marcadores de posición se utilizan para evitar la inyección de SQL, 
    // ya que los valores se escapan automáticamente.

    // Interactuamos con la bbdd, pasamos la consulta anterior
    db.query(sql, [id], (err, result) => {
        //en caso de error
        if (err) {console.log("No se pudo encontrar el libro", err);
            return;} 
        //enviamos en formato json
        res.json(result);
    });
};

const createBook = (req, res) => {
 
    const { title, autor, year,tapa,tematica_id } = req.body;

    const sql = 'INSERT INTO libros (title, autor, year, tapa, tematica_id ) VALUES (?, ?, ?, ?, ? )';

    db.query(sql, [title, autor ,year, tapa, tematica_id], (err, result) => {

         err ? console.log(err):res.json({ message: 'Libro creado', bookId: result.insertId });
    });
};

const updateBook = (req, res) => {
    const { id } = req.params;
    const { title, autor, year, tapa, tematica_id } = req.body;

    // Crea un array para almacenar las oraciones seteadas y otro para los valores
    let setClauses = [];
    let values = [];

    if (title) {
        setClauses.push('title = ?');
        values.push(title);
    }
    if (autor) {
        setClauses.push('autor = ?');
        values.push(autor);
    }
    if (year) {
        setClauses.push('year = ?');
        values.push(year);
    }
    if (tapa) {
        setClauses.push('tapa = ?');
        values.push(tapa);
    }
    if (tematica_id) {
        setClauses.push('tematica_id = ?');
        values.push(tematica_id);
    }

    // Si ningún campo se actualiza retorna mensaje de error
    if (setClauses.length === 0) {
        return res.status(400).json({ mensaje: "No se proporcionaron campos para actualizar" });
    }

    // Une las oraciones en una sola
    const setClauseString = setClauses.join(', ');

    // Agrega el id al array de valores
    values.push(id);

    // Construye la query
    const sql = `UPDATE libros SET ${setClauseString} WHERE id = ?`;

    // Ejecuta la query
    db.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ mensaje: "Error al actualizar el libro" });
        }
        res.json({ mensaje: "Libro actualizado" });
    });
};

const deleteBook = (req, res) => {
    //Desestructuramos la peticion
    const { id } = req.params;

    const sql = 'DELETE FROM libros WHERE id = ?';

    db.query(

        sql, //La consulta SQL

        [id], //Siempre se manda un array por mas que sea uno

        //La funcion con err y results
        (err, results) => {

            // Si hay error

            err ? console.log(err) : "";


            // Si todo va bien
            res.json({ mensaje: "Libro borrado!" });

        });



    }

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};