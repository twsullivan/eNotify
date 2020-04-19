var module = {};
var moment = require('moment-timezone');
var models = require("../models");
var deviceService = require("../services/deviceService.js")(models);
var locationService = require("../services/locationService.js")(models);
var timeZones = moment.tz.names();

exports.setup = function (req, res) {
    var extid = req.query.extId;
    deviceService.getDeviceById(extid).then(function(selected) {
        locationService.getAll().then(function (locations) {
            if (locations) {
                locations.forEach(location => {
                    if (selected) {
                        selected.forEach(element => {
                            if (location.id === element.locationId)
                                location['checked'] = 'checked';
                        });
                    }
                    if(location.checked == undefined)
                        location['checked'] = '';
                });
            }
            var isAdministrator = (req.user != undefined ? ((req.user.permissions & 2) === 2) ? true : false : false);
            var isSender = (req.user != undefined ? ((req.user.permissions & 1) === 1) ? true : false : false);
            res.render('setup', {
              domain: "https://enotify.iodrop.net",
              redirectUrl: req.url,
              isAuthenticated: req.isAuthenticated(),
              isAdmin: isAdministrator,
              isSender: isSender,
              username: (req.user != undefined ? req.user.firstname + ' ' + req.user.lastname : 'Sign In'),
              locations: locations,
              timeZones: timeZones
            });
        });
    });
}

exports.getDeviceId = function (req, res) {
    res.render('getDeviceId');
}

exports.add = function (req, res) {
    var device = {
      extId: req.body.extId,
      locationId: req.body.locationId
    }

    deviceService.insert(device).then(() => {
      res.end();
    });
  }
  
  exports.delete = function (req, res) {
    var promises = [];

    req.body.devices.forEach((device) => {
        console.log("device: ", device);
      promises.push(deviceService.delete(device.extId, device.locationId));
    });
  
    Promise.all(promises).then(() => {
      res.end();
    });
  }