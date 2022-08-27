const express = require('express');
const UserModel = require('../models/users.js')
const sessionRouter = express.Router();

sessionRouter.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !password) return res.status(400).send({ error: "Incomplete values" })
    let user = {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        age: age,
    }
    try {
        const result = await UserModel.create(user);
        res.send({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

sessionRouter.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).send({ error: "Email not provided" })
        if (!password) return res.status(400).send({ error: "Password not provided" })
        const user = await userService.findOne({ $and: [{ email: email }, { password: password }] }, { first_name: 1, last_name: 1, email: 1 });
        if (!user) return res.status(400).send({ error: 'User not found' });
        req.session.user = user;
        res.send({ status: "success", payload: user })
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
