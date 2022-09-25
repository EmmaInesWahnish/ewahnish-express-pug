const express = require('express')
const logger = require('../../config/winston.js')

const sumRouter = express.Router();

sumRouter.get('/:num1/:num2', (req, res) => {
    const { num1, num2 } = req.params;
    if (req.params.num1 === "" || req.params.num2 === "") {
        logger.error('Insuficient params')
        return res.status(400).send('Insuficient params');
    }
    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid types');
        return res.status(400).send('Invalid Types');
    }
    logger.verbose('Convirtiendo a number');
    let parsedNumber1 = parseInt(num1);
    let parsedNumber2 = parseInt(num2);
    logger.debug('Operando números');
    let result = parsedNumber1 + parsedNumber2;
    logger.info(`Operación realizada con resultado ${result}`)
    res.send(`El resultado es ${result}`)
})

sumRouter.get('/', (req, res) => {
    logger.error('Insuficient params')
    return res.status(400).send('Insuficient params');
})

module.exports = sumRouter
