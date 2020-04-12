var exports = module.exports = {}

exports.locate = function(req, res) {
    var config = require("../../config/google/config.json");
    res.render('locate', config);
}

exports.signup = function(req, res) {
    console.log("req query message: ", JSON.stringify(req.query));
    res.render('signup');
 
}

exports.reset = function(req, res) {
    if(req.isAuthenticated()) {
        res.render('reset', {
            isAuthenticated: req.isAuthenticated(),
            username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In')
        });
    } else {
        res.render('login', {
            redirect: '/reset',
            isAuthenticated: req.isAuthenticated(),
            username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In')
        })
    }
}

exports.signin = function(req, res) {

    res.render('login', { 
        redirect: req.query.redirect, 
        isAuthenticated: req.isAuthenticated(),
        username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In')
      });
 
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}

exports.unauthorized = function(req, res) {
    res.render('unauthorized', { 
        redirect: req.query.redirect, 
        isAuthenticated: req.isAuthenticated(),
        username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In')
    })
}