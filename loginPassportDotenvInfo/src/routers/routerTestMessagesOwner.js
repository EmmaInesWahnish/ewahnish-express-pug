const express = require('express');
const MessagesDao = require('../daos/MessagesDao.js');
const messageNormalizeDenormalizeOwner = require('../js/messajesNormalizeDenormalizeOwner.js');
const routerTestMessagesOwner = express.Router();

const MessagesTest = new MessagesDao();

routerTestMessagesOwner.get('/', async (req, res) => {
    let bothLists = {};
    let generated_messages = [];
    try {
        generated_messages = await MessagesTest.populateOwner(req.query.quantity);
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar la lista de items de prueba',
            error: error
        })
    }

    try {
        bothLists = await messageNormalizeDenormalizeOwner(generated_messages);
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

module.exports = routerTestMessagesOwner
