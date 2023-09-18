const localStrategy = require('passport-local').Strategy;
//we bring in our mongoose to check if the password match
const mongoose = require('mongoose');
// we bring in our bcrypt to check if password match
const bcrypt = require('bcryptjs');


//we bring in our user model
const User = require('../models/User');



module.exports = function (passport) {
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Match User
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Email is not registered' });
                    }

                    //Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password is incorrect' });
                        }
                    });
                })
                .catch(err => console.log(err));
        })

    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });


    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        return done(null, user);
    });


    // passport.deserializeUser((id, done) => {
    //     User.findById(id, (err, user) => {
    //         done(err, user);
    //     });
    // });


}