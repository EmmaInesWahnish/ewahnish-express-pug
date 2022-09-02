const passport = require('passport');
const passport_local = require('passport-local');
const usersService = require('../models/Users.js');
const { createHash, isValidPassword } = require('../utils.js');
const LocalStrategy = passport_local.Strategy;

const initializePassport = () => {

    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
        try {
            const { name } = req.body;
            if (!name || !email || !password) return done(null, false);
            let exists = await usersService.findOne({ email: email });
            if (exists) return done(null, false);
            let result = await usersService.create({
                name,
                email,
                password: createHash(password)
            })
            //SI TODO SALIÓ BIEN
            return done(null, result)
        }
        catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done)=>{
        let result = await usersService.findOne({_id:id})
        return done(null,result);
    })

}

export default initializePassport;
