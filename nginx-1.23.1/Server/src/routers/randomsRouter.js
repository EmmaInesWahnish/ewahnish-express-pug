const express = require('express');
const randomNumberCount = require('../js/randomNumberCount.js')

const randomsRouter = express.Router();

randomsRouter.get('/', async (req, res) => {
    const randomNoCeros = randomNumberCount(req.query.cant);
    res.send({
        randoms: randomNoCeros,
    });
})

module.exports = randomsRouter
