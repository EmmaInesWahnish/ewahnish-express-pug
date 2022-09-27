import express from 'express';
import randomNumberCount from '../js/randomNumberCount.js'

const randomsRouter = express.Router();

randomsRouter.get('/', async (req, res) => {
    const randomNoCeros = randomNumberCount(req.query.cant);
    req.logger.info(`Se han clasificado los numeros al azar`)
    res.send({
        randoms: randomNoCeros,
    });
})

export default randomsRouter
