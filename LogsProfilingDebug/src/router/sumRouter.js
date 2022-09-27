import express from 'express';

import {logger} from '../../utils.js'

const sumRouter = express.Router();

sumRouter.get('/:num1/:num2', (req, res) => {
    const { num1, num2 } = req.params;
    if (req.params.num1 === "" || req.params.num2 === "") {
        req.logger.error('Insuficient params')
        return res.status(400).send('Insuficient params');
    }
    if (isNaN(num1) || isNaN(num2)) {
        req.logger.error('Invalid types');
        return res.status(400).send('Invalid Types');
    }
    req.logger.verbose('Convirtiendo a number');
    let parsedNumber1 = parseInt(num1);
    let parsedNumber2 = parseInt(num2);
    req.logger.verbose('Operando números');
    let result = parsedNumber1 + parsedNumber2;
    req.logger.info(`Operación realizada con resultado ${result}`)
    res.send(`El resultado es ${result}`)
})

sumRouter.get('/', (req, res) => {
    req.logger.error('Insuficient params')
    return res.status(400).send('Insuficient params');
})

export default sumRouter
