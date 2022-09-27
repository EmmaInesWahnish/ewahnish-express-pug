import express from 'express';
import os from 'os';

const infoRouter = express.Router();

infoRouter.get('/', async (req, res) => {

    const CPUs = os.cpus().length;
    let argums =process.argv;
    let reservedMemory = process.memoryUsage().rss;
    let processId = process.pid;
    let processFolder = process.cwd();
    let nodeVersion = process.version;
    let execPath = process.execPath;
    let platform = process.platform;
    let myInfo = {
        message: 'Informacion',
        arguments: argums,
        platform: platform,
        nodeVersion: nodeVersion,
        reservedMemory:reservedMemory,
        exexPath: execPath,
        processId: processId,
        processFolder: processFolder,
        cpus: CPUs,
    }
    console.log("Console log of information : ", myInfo);
    try {
        res.json(myInfo);
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar informacion',
            error: error
        })
    }

})

export default infoRouter
