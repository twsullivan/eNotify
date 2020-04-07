var moment     = require('moment-timezone');

module.exports = (models) => {
    var module = {};
    var moment = require('moment-timezone');
    var models = require("../models");
    var locationService = require("../services/locationService.js")(models);

    var timeZones = moment.tz.names();
    var locations = locationService.getAll().then(function(data){
        
    });

    return module;
}