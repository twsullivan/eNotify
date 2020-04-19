var models = require("../models");
var permissionsService = require("../services/permissionsService.js")(models);

var exports = module.exports = {}

exports.edit = function(req, res) {
    var isAdministrator = (req.user != undefined ? ((req.user.permissions & 2) === 2) ? true : false : false);
    var isSender = (req.user != undefined ? ((req.user.permissions & 1) === 1) ? true : false : false);
    var users = permissionsService.getUsers().then(function(users) {
        res.render('permissions', {
            domain: "https://enotify.iodrop.net",
            isAdmin: isAdministrator,
            isSender: isSender,
            isAuthenticated: req.isAuthenticated(),
            username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In'),
            users: users
        });
    });
    
}

exports.set = function(req, res) {
    permissionsService.update(req.body.id, req.body.permission).then(function(){
        res.send("{status:'ok'}");
    });
}