var exports = module.exports = {}

var moment = require('moment');
var sequelize = require("sequelize");
var models = require("../models");
var messageService = require("../services/messageService.js");

exports.new = function(req, res) {

    var Locations = [{id:1,name:'UWF'},{id:2,name:'PSC'}];

    // Render sendmessage and pass in locations
    res.render('sendmessage', { Locations: Locations });

}

exports.send = function(req, res) {

    var msg = req.body.messageText;

    messageService.sendMessage(msg);

    res.render('Thank you');
}