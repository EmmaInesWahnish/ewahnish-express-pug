const express = require('express');
const usersService = require('../models/Users.js')

const sessionRouter = express.Router();

sessionRouter.post('/register', async (req, res) => {
    console.log("in session router", req.body)
    const { email, password, first_name, last_name, age } = req.body;
    if (!first_name || !last_name || !email || !password) return res.status(400).send({ error: "Incomplete values" })

    let exists = await usersService.findOne({ email: email });
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" });

    let user = {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        age: age,
    }
    
    try {
        const result = await usersService.create(user);
        res.send({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

sessionRouter.post('/login', async (req, res) => {
    console.log("in sessionRouter ", req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const user = await usersService.findOne({$and:[{email:email},{password:password}]},{first_name:1,last_name:1,email:1});
        if (!user) return res.status(400).send({ status: "error", error: "User does not exist" });
        req.session.user = user;
        res.send({status:"success",payload:user})
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

sessionRouter.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("error");
        res.send("ok :)")
    })
})

module.exports = sessionRouter
