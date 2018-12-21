var authController = require('../controllers/authcontroller.js');
var path = require("path");

module.exports = function (app, passport) {

    app.get('/signup', authController.signup);


    app.get('/signin', authController.signin);


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signin.htnl',
        failureRedirect: '/signup.html'
    }
    ));


    app.get('/dashboard', isLoggedIn, authController.dashboard);


    app.get('/logout', authController.logout);


    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard.html',
        failureRedirect: '/signin'
    }
    ));


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }


}