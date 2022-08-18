//const { knex } = require('./src/options/mariaDB.js');
const { knexSqLite } = require('./src/options/mySqlite3.js');
const ProductsDaoMongoDb = require('./src/daos/ProductDaoMongoDb.js');
const DbContainer = require('./src/api/DbContainer.js')
const express = require('express');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const routerTestProducts = require('./src/routers/routerTestProducts.js')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const Messages = new DbContainer(knexSqLite, 'messages');
const Products = new ProductsDaoMongoDb();

let list = [];
let productos = [];

app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true }))

app.engine('hbs',
    hbs.engine({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        layoutsDir: __dirname + '/public/views/layouts/', //ruta a la plantilla principal
        partialsDir: __dirname + '/public/views/partials/' //ruta a los parciales
    })
);

//Template engine setting
app.set('view engine', 'hbs');
app.set('views', './public/views');
app.set('view engine', 'html');

app.use('/api/productos-test', routerTestProducts);

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

app.get('/productos', async (req, res) => {

    try {
        productos = await Products.getAll()
    }
    catch (error) {
        console.log(error);
    }

    console.log(productos)
    res.render('products.hbs', { productos });
});

const addToMessageList = async (msg) => {
    try {
        await Messages.saveLine(msg);
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


