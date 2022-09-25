const express = require('express');
const compression = require('compression');

const gzipRouter = express.Router();

gzipRouter.use(compression());

gzipRouter.get('/', async (req, res) => {
    let string ="Hola como estan"
    for (let i = 0; i < 1000; i++){
        string+="Hola como estan";
    }
    res.send(string);
})

module.exports = gzipRouter
