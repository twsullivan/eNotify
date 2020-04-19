var authController = require('../controllers/authcontroller.js');
var homeController = require('../controllers/homecontroller.js');
var locationController = require('../controllers/locationController.js');
var messageController = require('../controllers/messageController.js');
var dashboardController = require('../controllers/dashboardcontroller.js');
var setupController = require('../controllers/setupcontroller.js');
var permissionsController = require('../controllers/permissionsController.js');

module.exports = function (app, passport) {

    function getRedirectUrl(req){
        if (req && req.body.redirect)
            return req.body.redirect;
        return "/";
    }

    app.get('/signup', authController.signup);
    app.get('/reset', isLoggedIn, authController.reset);
    app.get('/signin', authController.signin);
    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (info) {
                //res.redirect(`/signup?message=${info.message}`);
            } else {
                //res.redirect(getRedirectUrl(req));
            }
        })(req,res,next);
    });
    app.post('/doReset', isLoggedIn, authController.doReset);
    app.post('/signin', function (req, res, next) {
        passport.authenticate('local-signin', {
            successRedirect: getRedirectUrl(req),
            failureRedirect: 'https://enotify.iodrop.net/signup'
        })(req,res,next);
    });
    app.get('/', homeController.home);
    app.post('/validate', homeController.validate);
    app.post('/register', homeController.register);
    app.post('/increment', homeController.increment);
    app.get('/locate', authController.locate);
    app.get('/locations', isLoggedIn, locationController.locations);
    app.get('/locations/getAll', locationController.getAll);
    app.post('/locations/delete', isLoggedIn, locationController.delete);
    app.post('/locations/add', isLoggedIn, locationController.add);
    app.get('/dashboard', isLoggedIn, dashboardController.dashboard);
    app.get('/message/new', isLoggedIn, messageController.new);
    app.post('/message/send', isSender, messageController.send);
    app.get('/message/view', messageController.view);
    app.get('/logout',authController.logout);
    app.get('/unauthorized', authController.unauthorized);
    app.get('/settings', setupController.setup);
    app.get('/settings/getDeviceId', setupController.getDeviceId);
    app.post('/settings/add', setupController.add);
    app.post('/settings/remove', setupController.delete);
    app.get('/permissions', isLoggedIn, permissionsController.edit);
    app.post('/permissions/set', isLoggedIn, permissionsController.set);

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated()){
            return next();
        }
        res.redirect(`/signin?redirect=${req.url}`);
     
    }

    function isSender(req, res, next) {
        if (req.isAuthenticated()) {
            if ((req.user.permissions & 1) === 1 ) {
                return next();
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/signin?redirect=${req.url}`);
        }
    }
}

