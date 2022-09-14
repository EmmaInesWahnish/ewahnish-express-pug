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

const args = minimist(process.argv.slice(2),{alias:{p:"PORT"},default:{p:8080}});
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

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
      res.writeHead(200);
      res.end('Frogs are jumping\n');
    }).listen(8000);
  
    console.log(`Worker ${process.pid} started`);
  }

const port = configObject.port;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port} process id ${process.pid}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))