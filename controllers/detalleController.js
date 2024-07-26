const db = require('../db/db');

const getAllDetalles = (req, res) => {
    const sql = 'SELECT * FROM detalle';
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return;
        } 
        res.json(results);
    });
};

const getDetalleById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM detalle WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log("No se pudo encontrar el detalle", err);
            return;
        }
        res.json(result);
    });
};

const createDetalle = (req, res) => {
    const { isbn,editorial,idioma,traductor,formato,lanzamiento,adicional,pdf } = req.body;

    const sql = 'INSERT INTO detalle (isbn,editorial,idioma,traductor,formato,lanzamiento,adicional,pdf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [isbn,editorial,idioma,traductor,formato,lanzamiento,adicional,pdf], (err, result) => {

         err ? console.log(err):res.json(
            { message: 'Detalle creado', DetalleId: result.insertId }
            );
    });
};

const updateDetalle = (req, res) => {
    const { id } = req.params;
    const { isbn } = req.body;

    let setClauses = [];
    let values = [];

    if (isbn) {
        setClauses.push('isbn = ?');
        values.push(isbn);
    }
    
    if (setClauses.length === 0) {
        return res.status(400).json(
            { mensaje: "No se proporcionaron campos para actualizar" });
    }

    const setClauseString = setClauses.join(', ');

    values.push(id);

    // Construye la query
    const sql = `UPDATE detalle SET ${setClauseString} WHERE detalle_id = ?`;

    // Ejecuta la query
    db.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ mensaje: "Error al actualizar el detalle" });
        }
        res.json({ mensaje: "Detalle actualizado" });
    });
};

const deleteDetalle = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM detalle WHERE id = ?';

    db.query(
        sql,
        [id],
        (err, results) => {
            err ? console.log(err) : "";
            res.json({ mensaje: "Detalle borrado!" });
        });
    }

module.exports = {
    getAllDetalles,
    getDetalleById,
    createDetalle,
    updateDetalle,
    deleteDetalle
};