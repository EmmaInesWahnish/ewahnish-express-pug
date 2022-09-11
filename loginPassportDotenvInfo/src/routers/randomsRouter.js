const express = require('express');
const processRandoms = require('../js/processRandoms.js')

const randomsRouter = express.Router();

randomsRouter.get('/', async (req, res) => {

    process.on('exit', evt => {
        console.log("Saliendo...")
        console.log(evt);
    })
    process.on('uncaughtException', evt => {
        console.log("evt", typeof evt);
        console.log("Excepción no controlada");
    })

    let object = await processRandoms(100);

    try {
        res.json({
            message: 'Numeros al azar',
            randomArray: object
        });
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar informacion',
            error: error
        })
    }

})

module.exports = randomsRouter
