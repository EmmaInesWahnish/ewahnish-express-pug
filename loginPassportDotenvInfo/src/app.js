const express = require('express');
const minimist = require('minimist');
const infoRouter = require('./routers/infoRouter.js');
const randomsRouter = require('./routers/randomsRouter.js');

const app = express();
const http = require('http');
const server = http.createServer(app);

const args = minimist(process.argv.slice(2),{alias:{p:"PORT"},default:{p:8080}});
const {PORT} = args;

let configObject = {
    port : PORT,
    others: args._
}


app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',infoRouter);
app.use('/api/randoms',randomsRouter);

const port = configObject.port;
server.listen(port, () => {
    console.log(`Server listening at port ${server.address().port}`);
});


