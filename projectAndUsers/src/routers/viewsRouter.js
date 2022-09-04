import express from 'express';

const viewsRouter = express.Router();

viewsRouter.get('/register',(req,res)=>{
    if(req.session.user) return res.redirect('/');
    res.render('registerForm.hbs');
})

viewsRouter.get('/login',(req,res)=>{
    if(req.session.user) return res.redirect('/redirect');
    res.render('loginForm.hbs');
})

export default viewsRouter
