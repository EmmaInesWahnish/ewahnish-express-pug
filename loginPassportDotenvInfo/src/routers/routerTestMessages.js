const express = require('express');
const MessagesDao = require('../daos/MessagesDao.js');
const messageNormalizeDenormalize = require('../js/messajesNormalizeDenormalize.js');
const routerTestMessages = express.Router();

const MessagesTest = new MessagesDao();

routerTestMessages.get('/', async (req, res) => {
    let bothLists = {};
    let generated_messages = [];
    try {
        generated_messages = await MessagesTest.populate(req.query.quantity);
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar la lista de items de prueba',
            error: error
        })
    }

    try {
        bothLists = await messageNormalizeDenormalize(generated_messages);
        res.json({
            lists: bothLists
        })
    }
    catch (error) {
        res.json({
            message: 'No se ha podido normalizar la lista de items de prueba',
            error: error
        })
    }
    //res.render('messages.hbs', { generated_messages })
})

module.exports = routerTestMessages
