var authController = require('../controllers/authcontroller.js');
var homeController = require('../controllers/homecontroller.js');
var messageController = require('../controllers/messageController.js');
var dashboardController = require('../controllers/dashboardcontroller.js');

module.exports = function (app, passport) {

    function getRedirectUrl(req){
        console.log('url: ', req.body)
        if (req && req.body.redirect)
            return req.body.redirect;
        return "/dashboard";
    }

    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', {
            successRedirect: getRedirectUrl(req),
            failureRedirect: '/signup'
        })(req,res,next);
    });
    app.post('/signin', function (req, res, next) {
        passport.authenticate('local-signin', {
            successRedirect: getRedirectUrl(req),
            failureRedirect: '/signup'
        })(req,res,next);
    });
    app.get('/', homeController.home);
    app.post('/validate', homeController.validate);
    app.get('/locate', authController.locate);
    app.get('/dashboard', isLoggedIn, dashboardController.dashboard);
    app.get('/message/new', isLoggedIn, messageController.new);
    app.post('/message/send', isLoggedIn, messageController.send);
    app.get('/message/view', messageController.view);
    app.get('/logout',authController.logout);

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated()){
            return next();
        }
        res.redirect(`/signin?redirect=${req.url}`);
     
    }
}

