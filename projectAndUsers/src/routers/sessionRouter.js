import express from 'express';
import passport from 'passport';

const sessionRouter = express.Router();

sessionRouter.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerfail'}),async(req,res)=>{
    console.log("in session router", req.user)
    res.status(200).send({status:"success", payload: req.session.user})
})

sessionRouter.get('/registerfail', async (req, res) => {
    console.log("Register failed");
    res.status(500).send({ status: "error", error: "Register failed" })
})

sessionRouter.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginfail'}), async (req, res) => {
    console.log("in sessionRouter ", req.body);
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            id:req.user._id
        };
        res.status(200).send({status:"success", payload: req.session.user})
})

sessionRouter.get('/loginfail',(req,res)=>{
    console.log("login failed");
    res.status(500).send({status:"error",error:"Login failed"})
})

sessionRouter.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("error");
        res.status(200).send({ status: "success", payload: "Log Out successful" })
    })
})

export default sessionRouter
