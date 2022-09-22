const express = require('express');
const randomsRouter = require('./routers/randomsRouter.js');
const anotherRandomsRouter = require('./routers/anotherRandomsRouter.js');
const infoRouter = require('./routers/infoRouter.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api/randoms',randomsRouter);
app.use('/api/anotherRandoms',anotherRandomsRouter);
app.use('/api/info',infoRouter);

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port} process id ${process.pid}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))