import express from 'express';
import cluster from 'cluster';
import { cpus } from 'os';
import { logger } from '../utils.js'
import sumRouter from './router/sumRouter.js';
import infoRouter from './router/infoRouter.js';
import randomsRouter from './router/randomsRouter.js';
import config from './configurations/dotenvConfig.js'

const app = express();

const modeCluster = process.env.MODE;

if (modeCluster && cluster.isPrimary) {
    const numCPUs = cpus().length

    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
} else {

    app.use(logger())

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    //app.use(express.static(__dirname + '/public'));

    //app.use('/', sumRouter);
    app.use('/suma', sumRouter);
    app.use('/api/info', infoRouter);
    app.use('/api/randoms', randomsRouter);

    const port = process.env.PORT;
    const server = app.listen(port, () => {
        console.log(`Server http listening at port ${server.address().port} process id ${process.pid}`)
    })
    server.on('error', error => console.log(`Error en servidor ${error}`))
}