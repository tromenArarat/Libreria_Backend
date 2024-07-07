const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const db = require('../db/db');

const register = (req,res) => {
    let { nombre, clave, mail } = req.body;
    clave = bcrypt.hashSync(clave,8);

    const sql = 'INSERT INTO usuarios (nombre, clave, mail ) VALUES (?, ?, ? )';

    db.query(sql, [nombre, clave, mail], (err, result) => {
        if (err) {
            res.status(500).send({ "error": err });
            return;
          }
        const token = jwt.sign({id:result.insertId},process.env.CLAVE_DEV,{expiresIn:'5M'});
        res.status(201).send({auth:true,token});
        });
};

const login = (req,res)=>{
    const {mail,clave}=req.body;
    const sql = 'SELECT * FROM usuarios WHERE mail = ?';
    db.query(sql, [mail], (err, result) => {
        const usuario = result[0];
        if(!usuario) return console.error('Usuario no encontrado');
        const passwordIsValid = bcrypt.compareSync(clave,usuario.clave);
        if(!passwordIsValid) return res.status(401).send({auth:false,token:null});
        const token = jwt.sign({id:usuario.id},process.env.CLAVE_DEV,{expiresIn:'5M'});
        res.status(200).send({auth:true,token});
       });

}

module.exports = {
    register,
    login
};