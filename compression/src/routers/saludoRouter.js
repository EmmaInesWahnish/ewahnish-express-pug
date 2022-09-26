import express from 'express';

const saludoRouter = express.Router();

saludoRouter.get('/', async (req, res) => {
    let string ="Hola como estan"
    for (let i = 0; i < 10000; i++){
        string+="Hola como estan";
    }
    res.send(string);
})

export default saludoRouter
