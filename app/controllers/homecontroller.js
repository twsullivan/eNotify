var models = require("../models");
var messageService = require("../services/messageService.js")(models);
var deviceService = require("../services/deviceService.js")(models);

exports.home = function (req, res) {

  var groups = [];

  messageService.getAll().then(messages => {

    for (let [key, value] of Object.entries(messages)) {
      groups.push({"date":key, "count":value.length, "messages":value});
    }
    var isAdministrator = (req.user != undefined ? ((req.user.permissions & 2) === 2) ? true : false : false);
    var isSender = (req.user != undefined ? ((req.user.permissions & 1) === 1) ? true : false : false);

    res.render('home', {
      domain: "https://enotify.iodrop.net",
      redirectUrl: req.url,
      isAuthenticated: req.isAuthenticated(),
      isAdmin: isAdministrator,
      isSender: isSender,
      username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In'),
      groups: groups
    });
  });
}

exports.validate = function (req, res) {
  var deviceId = req.body.deviceId;
  var extId = req.body.extId;
  deviceService.getDeviceById(deviceId, extId).then(device => {
    if(device)
      res.json(device.extId);
    else
      res.status(500).send("Device not found.");
  });
}

exports.increment = function (req, res) {
  var messageId = req.body.messageId;
  messageService.increment(messageId);
}

exports.register = function (req, res) {

}

exports.locations = function (req, res) {

}