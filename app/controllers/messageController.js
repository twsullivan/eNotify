var exports = module.exports = {}

var moment = require('moment');
var sequelize = require("sequelize");
var models = require("../models");
var messageService = require("../services/messageService.js")(models);
var notificationService = require("../services/notificationService.js")(models);

var Locations = [{id:1,name:'UWF'},{id:2,name:'PSC'}];

exports.new = function(req, res) {

    // Render sendmessage and pass in locations
    res.render('sendmessage', { Locations: Locations });

}

exports.send = function(req, res) {

    var msg = {
        contents: { "en": req.body.MessageText },
        included_segments: ["All"]
    }
    console.log("user ", req.user);
    notificationService.sendNotification(msg, req.user);

    res.render('sendmessage', { Locations: Locations });
}