import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import store from 'session-file-store';
import handlebars from handlebars;
import __dirname from './utils.js'; 


const FileStore = store(session);

const app = express();

// this code is necessary for express to understand json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(cookieParser());

app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://admin:Jsthlj00N04@backend-project.zvlmt.mongodb.net/?retryWrites=true&w=majority'
        mongoOptions: i
    }),
    secret:"ThisIsEIWSecret01N04",
    resave: true,
    saveUninitialized: false
}))

let users= [];

app.get('/', (req,res) => {
    res.send('Hola:)')
})

app.post('/register', (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({error:'Missing Credentials'})
    req
})

app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    if(email==="admin@correo.com" && password==="contraseñaAdmin"){
        req.session.user = {
            email,
            role: "Admin"
        }
        res.send("Logueado :)")
    } else {
        res.send("Usuario o password incorrecto")
    }
})

const authMiddleware = (req, res, next) =>{

}

app.get('/current', (req, res) => {
    res.send(req.session.user)

})

app.get('/cookies',(req,res)=>{
    res.send(req.cookies);
})

app.delete('/cookies/:cname',(req,res)=>{
    let cookie = req.params.cname;
    res.cookie(req.cookies);
})

app.post('/cookies', (req, res) => {
    let {name, value, expires} = req.body;
    if(!name || !value) return res.status(400).send
    res.cookie(name, value, {
        maxAge:expires?expires*1000:10000
    })
})

/* Server Listen */
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))