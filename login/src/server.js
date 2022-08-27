const ProductsDaoMongoDb = require('./daos/ProductDaoMongoDb.js');
const ChatDaoMongoDb = require('./daos/ChatDaoMongoDb.js');
const mongoose = require('mongoose');
const envs = require('../dotenvConfig.js')
const express = require('express');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const routerTestProducts = require('./routers/routerTestProducts.js');
const routerTestMessages = require('./routers/routerTestMessages.js');
const routerTestMessagesOwner = require('./routers/routerTestMessagesOwner.js');
const routerTestMessagesTable = require('./routers/routerTestMessagesTable.js');
const viewsRouter = require('./routers/viewsRouter.js')
const sessionRouter = require('./routers/sessionRouter.js')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const store = require('session-file-store');
const MongoStore = require('connect-mongo');
const path = require('path');

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

app.use(express.static(__dirname + "/../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: MongoStore.create({
        mongoUrl:URL,
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl:100
    }),
    secret:"SecretPhraseRumplestilskin007",
    resave: false,
    saveUninitialized: false
}))

app.engine('hbs',
    hbs.engine({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        layoutsDir: __dirname + '/../public/views/layouts/', //ruta a la plantilla principal
        partialsDir: __dirname + '/../public/views/partials/' //ruta a los parciales
    })
);

//Template engine setting
app.set('view engine', 'hbs');
app.set('views', './public/views');
app.set('view engine', 'html');

app.use('/api/productos-test', routerTestProducts);
app.use('/api/mensajes-test', routerTestMessages);
app.use('/api/mensajes-test-owner', routerTestMessagesOwner);
app.use('/api/mensajes-test-table', routerTestMessagesTable);
app.use('/',viewsRouter);
app.use('/api/sessions',sessionRouter);

app.get('/', async (req, res) => {

    try {
        productos = await Products.getAll()
        res.render('index.hbs', { root: __dirname, productos })
    }
    catch (error) {
        console.log(error);
    }

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


