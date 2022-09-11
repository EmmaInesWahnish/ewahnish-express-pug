const express = require('express');

const infoRouter = express.Router();

infoRouter.get('/', async (req, res) => {

    process.on('exit', evt => {
        console.log("Saliendo...")
        console.log(evt);
    })
    process.on('uncaughtException', evt => {
        console.log("evt", typeof evt);
        console.log("Excepción no controlada");
    })
    let arguments =process.argv;
    let reservedMemory = process.memoryUsage().rss;
    let processId = process.pid;
    let processFolder = process.cwd();
    let nodeVersion = process.version;
    let execPath = process.execPath;
    let platform = process.platform;
    try {
        res.json({
            message: 'Informacion',
            arguments: arguments,
            platform: platform,
            nodeVersion: nodeVersion,
            reservedMemory:reservedMemory,
            exexPath: execPath,
            processId: processId,
            processFolder: processFolder,
        });
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar informacion',
            error: error
        })
    }

})

module.exports = infoRouter
