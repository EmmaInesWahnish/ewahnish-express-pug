const express = require('express');
const UserModel = require('../models/users.js')
const ProductsDaoMongoDb = require('../daos/ProductDaoMongoDb.js');
const viewsRouter = express.Router();

const Products = new ProductsDaoMongoDb();

viewsRouter.get('/', async (req, res) => {

    try {
        productos = await Products.getAll()
        res.render('index.hbs', { root: __dirname, productos })
    }
    catch (error) {
        console.log(error);
    }

})

viewsRouter.get('/',(req,res)=>{
    if(!req.session.user) return res.redirect('/login');
    res.render('home',{user:req.session.user});
})

viewsRouter.get('/register',(req,res)=>{
    if(req.session.user) return res.redirect('/');
    res.render('register');
})

viewsRouter.get('/login',(req,res)=>{
    if(req.session.user) return res.redirect('/');
    res.render('login');
})


module.exports = viewsRouter
