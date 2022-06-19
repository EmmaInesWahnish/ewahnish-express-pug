import express from 'express'
import anyContainerLoader from './api/containerLoadExpress.js'
import AnyContainer from './api/Container.js'
const People = new AnyContainer('./files/personas.txt');

let personas = [];

const app = express()

app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        personas = await People.getAll()
    }
    catch (error) {
        console.log(error);
    }
    res.render('formulario', { personas });
});

app.post('/datos', async (req, res) => {
    let element = [{
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad
    }]
    if (element) {
        try {
            await People.saveArray(element);
            try {
                personas = await People.getAll();
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
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))