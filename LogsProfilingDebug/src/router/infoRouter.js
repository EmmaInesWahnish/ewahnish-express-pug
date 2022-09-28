import express from 'express';
import os from 'os';
import config from '../configurations/dotenvConfig.js'

let useCompression = process.env.USE_COMPRESSION;
let consoleLog = process.env.CONSOLE_LOG;

let theTitle = ''

if (useCompression === 'YES') {
    theTitle = "Information with Compression";
}
else { 
    theTitle = "Information";
}

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
        message: theTitle,
        arguments: argums,
        platform: platform,
        nodeVersion: nodeVersion,
        reservedMemory:reservedMemory,
        exexPath: execPath,
        processId: processId,
        processFolder: processFolder,
        cpus: CPUs,
    }
    req.logger.verbose("Console log of information : ", myInfo);
    if (consoleLog === 'YES'){
        console.log("Informacion enviada :",myInfo);
    }
    let testOne = [];
    for (let i=0; i <1000; i++){
        testOne.push(myInfo);
    }
    try {
        res.json({testOne});
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar informacion',
            error: error
        })
    }

})

export default infoRouter
