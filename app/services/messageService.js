var moment = require('moment');
var sequelize = require("sequelize");

exports.getMessages = function(models) {

    // Get the user model
    var Users = models.user;
    var Messages = models.message;

    var Locations = [{id:1,name:'UWF'},{id:2,name:'PSC'}];

    // Render sendmessage and pass in locations
    return null;
}

exports.getMessage = function(models) {
    return null;
}

exports.sendMessage = function(message) {
    return null;
}