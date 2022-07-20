import express from 'express';
import routerProducts from './routers/routerProducts.js';
import routerCart from './routers/routerCart.js';
import envs from '../dotenvConfig.cjs'

const app = express();

// this code is necessary for express to understand json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);

app.all('*', (req, res) => {
    res.status(404).send({
        error: -2,
        message: `404 - ruta no encontrada ${req.path}`
    })
})

/* Server Listen */
const port = envs.PORT;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))