const express = require('express');
const ProductsDaoMongoDb = require('../daos/ProductDaoMongoDb.js');

const viewsRouter = express.Router();

const Products = new ProductsDaoMongoDb();

viewsRouter.get('/', async (req, res) => {
    if(!req.session.user) return res.redirect('/login');
    try {
        let productos = await Products.getAll()
        res.render('index.hbs', { root: __dirname, productos: productos , user:req.session.user})
    }
    catch (error) {
        console.log(error);
    }

})

viewsRouter.get('/register',(req,res)=>{
    if(req.session.user) return res.redirect('/');
    res.render('registerForm.hbs');
})

viewsRouter.get('/login',(req,res)=>{
    if(req.session.user) return res.redirect('/');
    res.render('loginForm.hbs');
})

module.exports = viewsRouter
