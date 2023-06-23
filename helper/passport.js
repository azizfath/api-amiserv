const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user.model')
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config()

passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            // console.log(email, password, req.body.firstName);
            try {
                const ensureEmail = await UserModel.findOne({ email: email });
                if (ensureEmail) {
                    // console.log(ensureEmail)
                    return done(null, false, { message: 'Email already registered' })
                }
                // const user = await UserModel.create({email, password});
                const user = await new UserModel({ "email": email, "password": password, "firstname": req.body.firstname, "lastname": req.body.lastname, "username": req.body.username, "nomor": req.body.nomor, "role": "user" })
                await user.save()
                // console.log(user)
                return done(null, user);
            }
            catch (error) {
                console.log(error)
                done(error)
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            // console.log(email, password)
            try {
                const user = await UserModel.findOne({ email: email });
                // console.log(!user)
                if (!user) {
                    return done(null, false, { message: 'User not found' })
                };
                const validate = await user.isValidPassword(password);
                // console.log(validate)
                if (validate == false) {
                    return done(null, false, { message: 'Password missmatch' })
                };
                // console.log(user)
                return done(null, user, { message: 'Login Successfully' })
            }
            catch (error) {
                return done(error);
            }
        }
    )
)

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET_OR_KEY,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('secret_token')
        },

        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
)