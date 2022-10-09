import express from 'express';
import { __dirname } from '../utils.js'
import multer from 'multer'

const viewsRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        //console.log(file)
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

viewsRouter.get('/register', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    else {
        res.json({
            message: 'register',
        });
    };
})

viewsRouter.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    else {
        res.json({
            message: 'Log',
        });
    };
})

viewsRouter.get('/', (req, res) => {
    res.json({
        status: 'information',
        user: req.session.user
    });
})

viewsRouter.get('/upload', (req, res) => {
    res.sendFile(__dirname + '/upload.html')
})

viewsRouter.post('/uploadfile', upload.single('thisFile'), (req, res, next) => {
    const file = req.file
    //console.log(file)
    if (!file) {
        const error = new Error('Error subiendo archivo')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
    //res.send(file)
})


export default viewsRouter
