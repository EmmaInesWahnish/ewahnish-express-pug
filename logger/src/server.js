import express from 'express';
import {logger} from '../utils.js'
import sumRouter from './router/sumRouter.js';

const app = express();

app.use(logger())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/public'));

app.use('/', sumRouter);
app.use('/suma', sumRouter);

const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port} process id ${process.pid}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))