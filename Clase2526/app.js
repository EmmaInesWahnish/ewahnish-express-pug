import express from 'express';
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access'
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import passport from 'passport'

const app = express();
const server = app.listen(8080,()=>console.log("Listening on port 8080"));

app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use('/',viewsRouter);