const express = require('express');
const expressLayouts = require(`express-ejs-layouts`);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const nodemailer = require(`nodemailer`);
const ejs = require(`ejs`)


const app = express();


//Passport config
require(`./config/passport`)(passport);


//CONNECTING TO THE MONGODB DATABASE
mongoose.connect('mongodb://127.0.0.1:27017/myportalDB')
    .then(() => console.log(`mongoDB connected...`))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


//bodyparser
app.use(express.static(`public`))
app.use(express.urlencoded({ extended: true }));

//Express Session
app.use(require("express-session")({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(session)({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// });

//Connect Flash
app.use(flash());

//creating global variable for color changing
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
//PASSPORT IS FOR AUTHENTICATION


//ROUTES
app.use(`/`, require(`./routes/index`));

app.use(`/users`, require(`./routes/users`));





const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));