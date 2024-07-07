const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req,res,next)=>{
    const authHeader = req.headers['authorization']; // // lo mismo que // req.headers.authorization;
    if(!authHeader) return res.status(401).send('Authorization header missing');
    const token = authHeader.split(' ')[1];
    if(!token) return res.status(403).send({auth:false,message:'Token invalid or missing'});
    jwt.verify(token,process.env.CLAVE_DEV,(err,decoded)=>{
        if(err) return res.status(500).send({auth:false,message:'Failed to authenticate token'});
        req.userId=decoded.id;
        next();
    })
}