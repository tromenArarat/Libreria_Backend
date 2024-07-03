const db = require('../db/db');

const getAllTematicas = (req, res) => {
    const sql = 'SELECT * FROM tematica';
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return;
        } 
        res.json(results);
    });
};

const getTematicaById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM tematica WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log("No se pudo encontrar la temática", err);
            return;
        }
        res.json(result);
    });
};

const createTematica = (req, res) => {
    const { name } = req.body;

    const sql = 'INSERT INTO tematica (name) VALUES (?)';

    db.query(sql, [name], (err, result) => {

         err ? console.log(err):res.json(
            { message: 'Temática creada', TematicaId: result.insertId }
            );
    });
};

const updateTematica = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    let setClauses = [];
    let values = [];

    if (name) {
        setClauses.push('name = ?');
        values.push(name);
    }
    
    if (setClauses.length === 0) {
        return res.status(400).json(
            { mensaje: "No se proporcionaron campos para actualizar" });
    }

    const setClauseString = setClauses.join(', ');

    values.push(id);

    // Construye la query
    const sql = `UPDATE tematica SET ${setClauseString} WHERE id = ?`;

    // Ejecuta la query
    db.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ mensaje: "Error al actualizar la temática" });
        }
        res.json({ mensaje: "Temática actualizada" });
    });
};

const deleteTematica = (req, res) => {
    //Desestructuramos la peticion
    const { id } = req.params;

    const sql = 'DELETE FROM tematica WHERE id = ?';

    db.query(
        sql,
        [id],
        (err, results) => {
            err ? console.log(err) : "";
            res.json({ mensaje: "Temática borrada!" });
        });
    }

module.exports = {
    getAllTematicas,
    getTematicaById,
    createTematica,
    updateTematica,
    deleteTematica
};