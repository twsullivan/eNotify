var exports = module.exports = {}

exports.locate = function(req, res) {
    var config = require("../../config/google/config.json");
    res.render('locate', config);
}

exports.signup = function(req, res) {
 
    res.render('signup');
 
}

exports.signin = function(req, res) {
 console.log('body: ',req.query.redirect);
    res.render('login', { 
        redirect: req.query.redirect, 
        isAuthenticated: req.isAuthenticated(),
        username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In')
      });
 
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/signin');
 
    });
 
}