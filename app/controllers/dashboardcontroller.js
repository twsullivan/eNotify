var models = require("../models");
var messageService = require("../services/messageService.js")(models);

var exports = module.exports = {}

exports.dashboard = function(req, res) {

  messageService.get(req.query.id).then(function (message) {
    
    var percentResponded = Math.round(parseInt(message[0].received, 10) / parseInt(message[0].receipients, 10) * 100);
    var percentNoResponse = 100 - percentResponded;

    console.log("percentResponded: ",percentResponded);
    console.log("percentNoResponse: ",percentNoResponse);

    res.render('dashboard', {
      isAuthenticated: req.isAuthenticated(),
      username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In'),
      percentResponded: percentResponded || 0,
      percentNoResponse: percentNoResponse || 100
    });
  });
}
