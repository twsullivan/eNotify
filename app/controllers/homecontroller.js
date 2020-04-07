var models = require("../models");
var messageService = require("../services/messageService.js")(models);
var deviceService = require("../services/deviceService.js")(models);

exports.home = function (req, res) {

  var groups = [];

  messageService.getAll().then(messages => {
    console.log(JSON.stringify(messages));
    for (let [key, value] of Object.entries(messages)) {
      groups.push({"date":key, "count":value.length, "messages":value});
    }

    res.render('home', {
      isAuthenticated: req.isAuthenticated(),
      username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In'),
      groups: groups
    });
  });
}

exports.validate = function (req, res) {
  console.log(req.body);
  var deviceId = req.body.deviceId;
  var extId = req.body.extId;
  deviceService.getDeviceById(deviceId, extId).then(device => {
    if(device)
      res.json(device.extId);
    else
      res.status(500).send("Device not found.");
  });
}