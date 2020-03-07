var exports = module.exports = {}

var models = require("../models");
var messageService = require("../services/messageService.js")(models);
var notificationService = require("../services/notificationService.js");

exports.home = function (req, res) {

  var message = {
    contents: {"en": "This is a test message."}, 
    included_segments: ["All"]
  };

  notificationService.sendNotification(models, message);

  messageService.getAll().then(messages => {
    console.log(messages);
    res.render('home', {
      isAuthenticated: req.isAuthenticated(),
      username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In'),
      messages: messages
    });
  });
}
