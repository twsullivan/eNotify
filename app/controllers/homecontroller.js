var exports = module.exports = {}

var models = require("../models");
var messageService = require("../services/messageService.js");

exports.home = function (req, res) {
  messageService.getMessages(models).then(messages => {
    console.log(messages);
    res.render('home', {
      isAuthenticated: req.isAuthenticated(),
      username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In'),
      messages: messages
    });
  });
}
