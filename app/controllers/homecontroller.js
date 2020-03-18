var models = require("../models");
var messageService = require("../services/messageService.js")(models);
var deviceService = require("../services/deviceService.js")(models);
//var notificationService = require("../services/notificationService.js")(models);

exports.home = function (req, res) {

  var message = {
    contents: {"en": "This is a test message."}, 
    included_segments: ["All"]
  };

  //notificationService.sendNotification(message);

  messageService.getAll().then(messages => {
    console.log(JSON.stringify(messages));
    res.render('home', {
      isAuthenticated: req.isAuthenticated(),
      username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In'),
      messages: messages
    });
  });
}

exports.validate = function (req, res) {
  console.log(req.body);
  var deviceId = req.body.deviceId;
  deviceService.getDeviceById(deviceId).then(device => {
    if(device)
      res.json(device.extId);
    else
      res.status(500).send("Device not found.");
  });
}