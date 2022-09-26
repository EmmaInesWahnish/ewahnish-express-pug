import express from 'express';
import compression from 'compression';

const gzipRouter = express.Router();

gzipRouter.use(compression());

gzipRouter.get('/', async (req, res) => {
    let string ="Hola como estan"
    for (let i = 0; i < 10000; i++){
        string+="Hola como estan";
    }
    res.send(string);
})

export default gzipRouter