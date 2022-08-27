import passport from 'passport';
import local from 'passport-local';
import usersService from '../models/Users.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:'email'},async(req,email,password,done)=>{
        const {name} = req.body;
        if(!name||!email||!password) return done(null,false);
        let exists = await usersService.findOne({email:email});
        if(exists) return done(null,false);

    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    password.deserializeUser()
}

export default initializePassport