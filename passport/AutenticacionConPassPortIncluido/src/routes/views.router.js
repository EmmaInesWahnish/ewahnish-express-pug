import { Router } from 'express';

const router = Router();

router.get('/',(req,res)=>{
    if(!req.session.user) return res.redirect('/login');
    res.render('home');
});

router.get('/data',(req,res)=>{
    if(!req.session.user) return res.redirect('/login');
    res.render('data',{user:req.session.user})
})


router.get('/register',(req,res)=>{
    if(req.session.user) return res.redirect('/data');
    res.render('register');
})

router.get('/login',(req,res)=>{
    if(req.session.user) return res.redirect('/data');
    res.render('login');
})
export default router;