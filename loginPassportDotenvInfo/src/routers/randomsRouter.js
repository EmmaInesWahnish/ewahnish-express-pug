const express = require('express');
const { fork } = require('child_process');

const randomsRouter = express.Router();

randomsRouter.get('/', async (req, res) => {
    const child = fork("childProcess.js");
    child.send('Start', req.query.cant)
    child.on('message', randomNoCeros => {
        res.send({
            randoms: randomNoCeros,
        });
    })

})

module.exports = randomsRouter
