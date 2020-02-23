var exports = module.exports = {}

var moment = require('moment');
var sequelize = require("sequelize");
var models = require("../models");

exports.new = function(req, res) {

    // Get the user model
    var Users = models.user;
    var Messages = models.message;

    var Locations = [{id:1,name:'UWF'},{id:2,name:'PSC'}];

    // Render home view and pass in users
        res.render('sendmessage', {Locations: Locations});
}

exports.send = function(req, res) {
    res.render('Thank you');
}