const express = require('express');
const MessagesDao = require('../daos/MessagesDao.js');
const messageNormalizeDenormalize = require('../js/messajesNormalizeDenormalize.js');
const normalizedMessages = '../../files/normalizedMessages.json';
const denormalizedMessages = '../../files/normalizedMessages.json';

const routerTestMessagesTable = express.Router();

const MessagesTest = new MessagesDao();


routerTestMessagesTable.get('/', async (req, res) => {
    let generated_messages = [];
    for (let i = 0; i < 4; i++) {
        let message_group =[]
        try {
            message_group = await MessagesTest.populate(req.query.quantity);
            for (let j= 0; j < message_group.length; j++){
                generated_messages.push(message_group[j]);
            }
        }
        catch (error) {
            res.json({
                message: 'No se ha podido recuperar la lista de items de prueba',
                error: error
            })
        }
    }


    try{
        messageNormalizeDenormalize(generated_messages, normalizedMessages, denormalizedMessages);
    }
    catch(error){
        res.json({
            message: 'No se ha podido normalizar la lista de items de prueba',
            error: error
        })
    }
    res.render('messages.hbs', { generated_messages })
})

module.exports = routerTestMessagesTable
