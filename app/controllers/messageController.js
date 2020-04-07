var models = require("../models");
var locationService = require("../services/locationService.js")(models);
var messageService = require("../services/messageService.js")(models);
var notificationService = require("../services/notificationService.js")(models);
var homeController = require('../controllers/homecontroller.js');

var Locations = [{ id: 1, name: 'UWF' }, { id: 2, name: 'PSC' }];

exports.new = function (req, res) {

    // Render sendmessage and pass in locations
    //var Locations;
    //locationService.getAll().then(function (data) { Locations = data; });

    res.render('messageSend', { Locations: Locations, User: req.user });
}

exports.send = function (req, res) {

    var msg = {
        contents: { "en": req.body.MessageText },
        included_segments: ["All"]
    }
    console.log("user ", req.user);
    notificationService.sendNotification(msg, req.user);

    res.render('messageSend', { Locations: Locations });
}

exports.view = function (req, res) {

    if (req.query.id)
        messageService.get(req.query.id).then(function (Message) {
            console.log("Message: ", Message[0]);
            res.render('messageView', { Message: Message[0] });
        });
    else
        res.redirect('https://enotify.iodrop.net');
}