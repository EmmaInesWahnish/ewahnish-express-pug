const express = require('express');
const MessagesDao = require('../daos/MessagesDao.js')

const routerTestMessages = express.Router();

const MessagesTest = new MessagesDao();


routerTestMessages.get('/', async (req, res) => {
    let generated_messages = []
    try {
        generated_messages = await MessagesTest.populate(req.query.cant);
        res.render('messages.hbs', { generated_messages })        
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar la lista de items de prueba',
            error: error
        })
    }
})

module.exports = routerTestMessages
