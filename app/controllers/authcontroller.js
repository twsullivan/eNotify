var models = require("../models");
var authService = require("../services/authService.js")(models);

var exports = module.exports = {}

exports.locate = function(req, res) {
    var config = require("../../config/google/config.json");
    res.render('locate', config);
}

exports.signup = function(req, res) {
    var isAdministrator = (req.user != undefined ? ((req.user.permissions & 2) === 2) ? true : false : false);
    var isSender = (req.user != undefined ? ((req.user.permissions & 1) === 1) ? true : false : false);
    res.render('signup', {
        domain: "https://enotify.iodrop.net",
        isAdmin: isAdministrator,
        isSender: isSender,
        isAuthenticated: req.isAuthenticated(),
        username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In')
    });
 
}

exports.reset = function (req, res) {
    var isAdministrator = (req.user != undefined ? ((req.user.permissions & 2) === 2) ? true : false : false);
    var isSender = (req.user != undefined ? ((req.user.permissions & 1) === 1) ? true : false : false);
    res.render('reset', {
        domain: "https://enotify.iodrop.net",
        isAdmin: isAdministrator,
        isSender: isSender,
        isAuthenticated: req.isAuthenticated(),
        username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In')
    });
}

exports.doReset = function(req, res){
    authService.reset(req).then(function(){
        res.redirect('/');
    });
}

exports.signin = function(req, res) {
    console.log(" signin req query message: ", JSON.stringify(req.query));
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