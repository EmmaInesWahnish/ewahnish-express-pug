const express = require('express');
const MessagesDao = require('../daos/MessagesDao.js')

const routerTestMessages = express.Router();

const MessagesTest = new MessagesDao();


routerTestMessages.get('/', async (req, res) => {
    let generated_messages = [];
    for (let i = 0; i < 4; i++) {
        let message_group =[]
        try {
            message_group = await MessagesTest.populate(req.query.cant);
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
    res.render('messages.hbs', { generated_messages })
})

module.exports = routerTestMessages
