const express = require('express');

const app = express();

app.use('/static', express.static(__dirname + './public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.set('views', './views'); // especifica el directorio de vistas

app.set('view engine', 'pug'); // registra el motor de plantillas

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


/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
