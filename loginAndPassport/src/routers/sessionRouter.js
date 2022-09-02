const express = require('express');
const usersService = require('../models/Users.js')
const { createHash, isValidPassword } = require('../utils.js')

const sessionRouter = express.Router();

sessionRouter.post('/register', async (req, res) => {
    console.log("in session router", req.body)
    const { email, password, first_name, last_name, age } = req.body;
    if (!first_name || !last_name || !email || !password) return res.status(400).send({ error: "Incomplete values" })

    let exists = await usersService.findOne({ email: email });
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" });

    let user = {
        email: email,
        password: createHash(password),
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

sessionRouter.get('/registerfail', async (req, res) => {
    console.log("Register failed");
    res.status(500).send({ status: "error", error: "Register failed" })
})

sessionRouter.post('/login', async (req, res) => {
    console.log("in sessionRouter ", req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const user = await usersService.findOne({ email: email });
        if (!user) return res.status(400).send({ status: "error", error: "User does not exist" });
        if (!isValidPassword(user, password))res.status(400).send({ status: "error", error: "Incorrect password" });
        req.session.user = user;
        res.send({ status: "success", payload: user })
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

sessionRouter.get('/loginfail',(req,res)=>{
    console.log("login failed");
    res.send({status:"error",error:"Login failed"})
})

sessionRouter.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("error");
        res.send({ status: "success", payload: "Log Out successful" })
    })
})

module.exports = sessionRouter
