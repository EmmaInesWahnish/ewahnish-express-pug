import express from 'express';
import config from './configurations/dotenvConfig.js';
import infoRouter from './routers/infoRouter.js';
import minimist from 'minimist';
import cluster from 'node:cluster';
import http from 'node:http';
import { cpus } from 'node:os';
import process from 'node:process';

const numCPUs = cpus().length;
const app = express();

const args = minimist(process.argv.slice(2),{alias:{p:"PORT"},default:{p:8081}});
const {PORT} = args;

let configObject = {
    port : PORT,
    others: args._
}

// this code is necessary for express to understand json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use('/',infoRouter);

const port = configObject.port;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port} process id ${process.pid}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))