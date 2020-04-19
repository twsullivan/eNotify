var models = require("../models");
var locationService = require("../services/locationService.js")(models);
var messageService = require("../services/messageService.js")(models);
var notificationService = require("../services/notificationService.js")(models);
var homeController = require('../controllers/homecontroller.js');

exports.new = function (req, res) {
    locationService.getAll().then(function(locations) {
        var isAdministrator = (req.user != undefined ? ((req.user.permissions & 2) === 2) ? true : false : false);
        var isSender = (req.user != undefined ? ((req.user.permissions & 1) === 1) ? true : false : false);
        res.render('messageSend', { 
            Locations: locations, 
            User: req.user,
            domain: "https://enotify.iodrop.net",
            redirectUrl: req.url,
            isAuthenticated: req.isAuthenticated(),
            isAdmin: isAdministrator,
            isSender: isSender,
            username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In'),
            username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In')
        });
    });
}

exports.send = function (req, res) {

    locationService.get(req.body.Location).then(function(location){

        var msg = {
            contents: { "en": req.body.MessageText },
            //included_segments: ["All"]
            filters: [
                {"field": "tag", "key": location.name, "relation": "=", "value": location.name}
                // {"operator": "OR"}, 
                // {"field": "tag", "key": req.body.tag, "relation": "=", "value": req.body.tag}
            ]
        }

        notificationService.sendNotification(msg, req.body.subject, location.id, req.user).then(function(id){
            res.redirect(`https://enotify.iodrop.net/message/view?id=${id}`);
        })
    });
}

exports.view = function (req, res) {

    if (req.query.id)
        messageService.get(req.query.id).then(function (Message) {
            var isAdministrator = (req.user != undefined ? ((req.user.permissions & 2) === 2) ? true : false : false);
            var isSender = (req.user != undefined ? ((req.user.permissions & 1) === 1) ? true : false : false);
            res.render('messageView', {
                redirectUrl: req.url,
                domain: "https://enotify.iodrop.net",
                redirectUrl: req.url,
                isAuthenticated: req.isAuthenticated(),
                isAdmin: isAdministrator,
                isSender: isSender,
                username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In'),
                Message: Message[0],
                Location: Message[0].locations[0]
            });
        });
    else
        res.redirect('https://enotify.iodrop.net');
}