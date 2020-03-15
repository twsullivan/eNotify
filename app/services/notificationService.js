module.exports = (models) => {
    var module = {};
    var messageService = require("../services/messageService.js")(models);
    var config = require('../../config/onesignal/config.json');

    module.sendNotification = function (message) {

        message["app_id"] = config.api_id;

        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic " + config.api_key
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        var https = require('https');
        var req = https.request(options, function (res) {
            res.on('data', function (data) {
                console.log("Response:");
                console.log(JSON.parse(data));
                messageService.insert(message);
            });
        });

        req.on('error', function (e) {
            console.log("ERROR:");
            console.log(e);
        });

        req.write(JSON.stringify(message));
        req.end();
    };

    return module;
}