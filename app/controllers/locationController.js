var models = require("../models");
var deviceService = require("../services/deviceService.js")(models);
var locationService = require("../services/locationService.js")(models);

exports.locations = function (req, res) {

  var groups = [];

  locationService.getAll().then(locations => {
    var isAdministrator = (req.user != undefined ? ((req.user.permissions & 2) === 2) ? true : false : false);
    var isSender = (req.user != undefined ? ((req.user.permissions & 1) === 1) ? true : false : false);
    res.render('location', {
      domain: "https://enotify.iodrop.net",
      redirectUrl: req.url,
      isAuthenticated: req.isAuthenticated(),
      isAdmin: isAdministrator,
      isSender: isSender,
      username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In'),
      locations: locations,
      username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In')
    });
  });
}

exports.getAll = function (req, res) {
  locationService.getAll().then(locations => {
    res.setHeader('Content-Type', 'application/json');
    res.send({ locations: locations });
  });
}

exports.add = function (req, res) {
  var location = {
    name: req.body.name
  }
  console.log(location);
  locationService.insert(location).then(() => {
    res.end();
  });
}

exports.delete = function (req, res) {
  console.log(req.body.ids);
  var promises = [];
  req.body.ids.forEach((id) => {
    promises.push(locationService.delete(id));
    promises.push(deviceService.deleteLocation(id));
  });

  Promise.all(promises).then(() => {
    res.end();
  });
}