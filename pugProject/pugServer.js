import express from 'express'
import anyContainerLoader from './api/containerLoadExpress.js'
import AnyContainer from './api/Container.js'
const Products = new AnyContainer('./files/productos.txt');

let productos = [];

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/hello', function (req, res) {
    req.body = {
        mensaje: "Usando Pug en express"
    }
    res.render('hello.pug', req.body);
});

app.get('/urlparam', (req, res) => {
    res.send(req.query);
})

app.post('/urljson', (req, res) => {
    res.send(req.body);
})

app.get('/datos', (req, res)=>{
    res.render('meter.pug', req.query)
})

app.get('/', async (req, res) => {
    try {
        productos = await Products.getAll()
    }
    catch (error) {
        console.log(error);
    }
    res.render('form', { productos });
});

app.get('/productos', async (req, res) => {
    try {
        productos = await Products.getAll()
    }
    catch (error) {
        console.log(error);
    }
    res.render('products', { productos });
});

app.post('/productos', async (req, res) => {
    let element = [{
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }]
    if (element) {
        try {
            await Products.saveArray(element);
            try {
                productos = await Products.getAll();
                res.redirect('/')
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

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Server error ${error}`))