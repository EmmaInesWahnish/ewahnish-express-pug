const { knex } = require('./options/mariaDB.js');
const { knexSqLite } = require('./options/mySqlite3.js');
const DbContainer = require('./DbContainer/DbContainer.js');
const express = require('express');
const handlebars = require('express-handlebars');
const ProductsDao = require('./daos/ProductsDao.js')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const Messages = new DbContainer(knexSqLite, 'messages');
const Products = new DbContainer(knex, 'productos');
const ProductsTest = new ProductsDao();

let list = [];
let productos = [];

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))

app.engine('hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: __dirname + '/public/views/layouts/', //ruta a la plantilla principal
        partialsDir: __dirname + '/public/views/partials/' //ruta a los parciales
    })
);

//Template engine setting
app.set('view engine', 'hbs');
app.set('views', './public/views');
app.set('view engine', 'html');

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

app.get('/productos_test', async (req, res) => {
    let generated_products = []
    try {
        generated_products = await ProductsTest.populate(req.query.cant);
        console.log(generated_products);
        res.render('products.hbs', { generated_products })
    }

    catch (error) {
        console.log(error)
    }
})

app.get('/populate', async (req, res) => {
    try {
        const generated_products = await ProductsTest.populate(req.query.cant);
        res.json({
            message: 'Productos ',
            products: generated_products,
        });
    }
    catch (error) {
        console.log(error)
    }
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening at port ${server.address().port}`);
});


