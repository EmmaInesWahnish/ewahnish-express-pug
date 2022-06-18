const Container = require('./js/Container.js');
const loadContainer = require('./js/containerLoadExpress')

//const containerLoad = require('./js/containerLoadExpress.js')

const express = require('express');

const app = express();

//Here we create the routers for our routes
const routerSetupTest = express.Router();
app.use('/setupTest', routerSetupTest);


app.use('/static', express.static(__dirname + './public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.set('views', './views'); // especifica el directorio de vistas

app.set('view engine', 'ejs'); // registra el motor de plantillas

routerSetupTest.get('/hello', function (req, res) {
    req.body = {
        mensaje: "Usando Ejs en express"
    }
    res.render('hello.ejs', req.body);
});


routerSetupTest.get('/urlparam', (req, res) => {
    res.send(req.query);
})

routerSetupTest.post('/urljson', (req, res) => {
    res.send(req.body);
})

routerSetupTest.get('/datos', (req, res)=>{
    res.render('meter.ejs', req.query)
})


/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
