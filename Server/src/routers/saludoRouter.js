const express = require('express');

const saludoRouter = express.Router();

saludoRouter.get('/', async (req, res) => {
    let string ="Hola como estan"
    for (let i = 0; i < 1000; i++){
        string+="Hola como estan";
    }
    res.send(string);
})

module.exports = saludoRouter
