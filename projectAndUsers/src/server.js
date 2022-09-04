import express from 'express';
import routerProducts from './routers/routerProducts.js';
import routerCart from './routers/routerCart.js';
import envs from '../dotenvConfig.js';
import viewsRouter from './routers/viewsRouter.js';
import sessionRouter from './routers/sessionRouter.js';
import ChatDaoMongoDb from './daos/ChatDaoMongoDb.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import initializePassport from './configurations/passportConfig.js';
import passport from 'passport';

const app = express();

// this code is necessary for express to understand json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const URL = envs.URL.toString();
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

/* Server Listen */
const port = envs.PORT;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))