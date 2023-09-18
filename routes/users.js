const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require(`nodemailer`);
const ejs = require(`ejs`)

//User model
const User = require('../models/User');

//LOGIN PAGE
router.get(`/login`, (req, res) => res.render(`login`));

//rEGISTER PAGE
router.get(`/register`, (req, res) => res.render(`register`));



// Send email to the applicant
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ibro4grace@gmail.com',
        pass: 'mwjdanngcjoobowe'
    }
});

//register handle
router.post('/register', (req, res) => {
    const { name, email, scour, password, password2 } = req.body;
    let errors = [];

    //check required fields
    if (!name || !email || !scour || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    //check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Password do not match' });
    }

    //Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    //if all check complet
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            scour,
            password,
            password2
        });

    } else {

        //Validation Passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //User exist
                    errors.push({ msg: 'Email already registered' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        scour,
                        password,
                        password2
                    });

                } else {
                    const newUser = new User({
                        name,
                        email,
                        scour,
                        password,
                        password2
                    });
                    //IF YOU DONT WANT YOUR PASSWORD TO SAVE IN PLAIN TEXT USE HASH PASSWORD
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //SET PASSWORD TO HASHED
                        newUser.password = hash;
                        try {
                        //Save into DB
                        newUser.save();

                        let msg = `Dear` + ' ' + name + ' ' + `,based on your selected course` + ' ' + scour + ' ' + `,attached to this mail is an image containing necessary details.`;

                        const mailOptions = {
                            from: 'ibro4grace@gmail.com',
                            to: email,
                            subject: 'Registration Successful',
                            text: msg,
                    
                            // Attach image here if necessary
                            attachments: [
                                {
                    
                                    filename: scour + `.jpg`,
                                    path: __dirname + `/` + scour + `.jpg`,
                                    cid: scour + `.jpg`
                                }
                            ]
                    
                        };
                    
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log('Email sending error:', error);
                            } else {
                                console.log('Email sent:', info.response);
                            }
                        });

                           
                                req.flash('success_msg', 'You are now registered please login');
                                res.redirect('/users/login');
                           
                         } catch (err) {
                            console.log(err);
                            req.flash('error', 'An error occurred while adding your information');
                           

                        }

                    }))
                    // console.log(newUser);
                    // // newUser.save();
                    // res.send('hello');
                }
            });
    }


  

});


//login handle
router.post(`/login`, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);

});


router.get('/logout', function (req, res, next) {
    req.logout(() => {

        req.flash('success_msg', 'You have successfully logged out');
        res.redirect('/users/login');
    })

});


//Logout Handle
// router.get('/logout', function (req, res, next) {
//     req.logout(function (err) {
//         if (err) { return next(err); }
//         req.flash(`success_msg`, 'You have successfully logged out');
//         res.redirect('/users/login');
//     });
// });

module.exports = router;


