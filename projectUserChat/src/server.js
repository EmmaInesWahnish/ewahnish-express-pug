import express from 'express';
import routerProducts from './routers/routerProducts.js';
import routerCart from './routers/routerCart.js';
import config from './configurations/dotenvConfig.js';
import viewsRouter from './routers/viewsRouter.js';
import sessionRouter from './routers/sessionRouter.js';
import ChatDaoMongoDb from './daos/ChatDaoMongoDb.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import initializePassport from './configurations/passportConfig.js';
import passport from 'passport';
import { createServer } from "http";
import { Server } from "socket.io";
import cluster from 'node:cluster';
import http from 'node:http';
import { cpus } from 'node:os';
import process from 'node:process';

const numCPUs = cpus().length;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// this code is necessary for express to understand json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const URL = config.envs.URL.toString();
const Messages = new ChatDaoMongoDb();

app.use(session({
    store: MongoStore.create({
        mongoUrl:URL,
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl: 600
    }),
    secret:"SecretPhraseRumplestilskin007",
    resave: false,
    saveUninitialized: false
}))

let list = [];

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);
app.use('/',viewsRouter);
app.use('/api/sessions',sessionRouter);

app.all('*', (req, res) => {
    res.status(404).send({
        error: -2,
        message: `404 - ruta no encontrada ${req.path}`
    })
})

io.on('connection', async (socket) => {

    try {
        list = await Messages.getAll();
        for (let msg in list) {
            socket.emit('old messages', list[msg]);
        }
    }
    catch (error) {
        console.log(error);
    }

    io.sockets.emit('new user', `${socket.id} ha ingresado al Centro de Mensajes`);


    socket.on('disconnect', () => {
        io.sockets.emit('new user', `${socket.id} ha abandonado el Centro de mensajes`);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        addToMessageList(msg)
    })


});

const addToMessageList = async (msg) => {
    
    try {
        await Messages.save(msg);
    }
    catch (error) {
        console.log(error)
    }
    return list;
}

httpServer.listen(3000);

/* Server Listen */
const port = config.envs.PORT;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port} process id ${process.pid}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))