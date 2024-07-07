const dotenv = require('dotenv');
dotenv.config();
module.exports={
    secretKey: process.env.CLAVE,
    tokenExpiresIn:'1h'
};