import express from 'express';
import {logger} from '../utils.js'
import sumRouter from './router/sumRouter.js';
import infoRouter from './router/infoRouter.js';
import randomsRouter from './router/randomsRouter.js';
import config from './configurations/dotenvConfig.js'

const app = express();

app.use(logger())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/public'));

//app.use('/', sumRouter);
app.use('/suma', sumRouter);
app.use('/api/info',infoRouter);
app.use('/api/randoms', randomsRouter);

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port} process id ${process.pid}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))