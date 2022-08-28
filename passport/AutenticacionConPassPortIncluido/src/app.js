import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

const app = express();
const server = app.listen(8080,()=>console.log("Listening on port 8080"));
const connection = mongoose.connect('PEGUE SU PODEROSISIMA URL DE MONGUITO AQUI :)')

app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use(session({
    secret:"CoderSecretosoConquesoporfavorypapas",
    store:MongoStore.create({
        mongoUrl:'PEGUE SU PODEROSISIMA URL DE MONGUITO AQUI :) ',
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl:3600
    }),
    resave:false,
    saveUninitialized:false
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);