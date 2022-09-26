import express from 'express';
import gzipRouter from './routers/gzipRouter.js';
import saludoRouter from './routers/saludoRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/public'));

app.use('/api/saludo',saludoRouter);
app.use('/api/compression', gzipRouter);

const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port} process id ${process.pid}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))