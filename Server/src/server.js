const express = require('express');
const infoRouter = require('./routers/infoRouter.js');
const gzipRouter = require('./routers/gzipRouter.js');
const saludoRouter = require('./routers/saludoRouter.js')
const randomsRouter = require('./routers/randomsRouter.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/public'));

app.use('/api/randoms',randomsRouter);
app.use('/api/saludo',saludoRouter);
app.use('/api/info',infoRouter);
app.use('/api/compression', gzipRouter);

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port} process id ${process.pid}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))