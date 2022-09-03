const ProductsDaoMongoDb = require('./daos/ProductDaoMongoDb.js');
const ChatDaoMongoDb = require('./daos/ChatDaoMongoDb.js');
const mongoose = require('mongoose');
const envs = require('../dotenvConfig.js')
const express = require('express');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const viewsRouter = require('./routers/viewsRouter.js')
const sessionRouter = require('./routers/sessionRouter.js')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const initializePassport = require('./config/passportConfig.js')
const passport = require('passport');

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const URL = envs.URL.toString();
const Messages = new ChatDaoMongoDb();
const Products = new ProductsDaoMongoDb();
const connection = mongoose.connect(URL);

let list = [];
let productos = [];

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('hbs',
    hbs.engine({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        layoutsDir: __dirname + '/views/layouts/', //ruta a la plantilla principal
        partialsDir: __dirname + '/views/partials/' //ruta a los parciales
    })
);

//Template engine setting
app.set('view engine', 'hbs');
app.set('views',__dirname+'/views');
app.set('view engine', 'html');

app.use('/',viewsRouter);
app.use('/api/sessions',sessionRouter);

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

    socket.on('new product', async (msg) => {

        let element = [{
            title: msg.title,
            price: msg.price,
            thumbnail: msg.thumbnail
        }]
        if (element) {
            try {
                await Products.saveArray(element);
                try {
                    productos = await Products.getAll();
                    let howMany = productos.length;
                    io.sockets.emit('new product', productos[howMany - 1])
                }
                catch (error) {
                    console.log(error)
                }
            }
            catch (error) {
                console.log(error);
            }
        }

    });

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

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening at port ${server.address().port}`);
});


