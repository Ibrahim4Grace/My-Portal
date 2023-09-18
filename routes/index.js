const express = require('express');
const router = express.Router();
const nodemailer = require(`nodemailer`);
const flash = require('connect-flash');
const { ensureAuthenticated } = require('../config/auth');
const passport = require('passport');
const ejs = require(`ejs`)
const User = require('../models/User');



//Welcome page
router.get(`/`, (req, res) => res.render(`welcome`));


// Send email to the applicant
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ibro4grace@gmail.com',
        pass: 'mwjdanngcjoobowe'
    }
});

//Dashboard page
router.get(`/dashboard`, ensureAuthenticated, (req, res) => res.render(`dashboard`, { name: req.user.name })); //To show user name when loggin


// TO SHOW INFORMATION IN DB ON MY BROWSER IN TABLE
router.get(`/viewinfo/:uid`, (req, res) => {

    const emp = User.findOne({ name: req.params.uid })

        .then((records) => {
            // console.log(records);
            res.render(`viewinfo`, { data: records })
        })

        .catch((err) => {
            res.send(`There's a problem selecting from DB`);
            res.redirect('/dashboard');
            console.log(err);
        })
});

// TO EDIT YOUR DB INFORMATION
router.get(`/edit/:m_id`, (req, res) => {

    const mv = User.findOne({ _id: req.params.m_id })

        .then((recs) => {

            res.render(`edit`, { data: recs })
        })

        .catch((err) => {

            res.send(`There's a problem selecting from DB`);
            console.log(err);
        })
})

router.post(`/edit/:mu_id`, (req, res) => {
    let errors = [];

    const mu_id = req.params.mu_id;

    const { name, email, scour } = req.body;

    User.findByIdAndUpdate(mu_id, { $set: { name, email, scour } })

        .then(() => {

            // res.send(`Successfully Edited`)
            req.flash(`success_msg`, 'Information Successfully Updated');
            res.redirect('/dashboard');

        })
        .catch((err) => {
            console.log(err)
            res.send(`There is issue with your information`)

        })


    let msg = `Dear` + ' ' + name + ' ' + `, based on your selected course` + ' ' + scour + ' ' + `,You made some changes on your account, kindly ignore this mail if you were the one. However, if you aren't the one, please contact us immediately...  .`;

    const mailOptions = {
        from: 'ibro4grace@gmail.com',
        to: email,
        subject: 'Account Update Confirmation',
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


})

router.get(`/delete/:mu_id`, (req, res) => {


    const id = req.params.mu_id;
    User.findByIdAndDelete(id)

        .then(() => {

            req.flash(`success_msg`, 'You have successfully deleted your account');
            res.redirect('/users/login');

        })
        .catch(() => {

            res.send(`Data deleted Successfully`)
        })



});

module.exports = router;

