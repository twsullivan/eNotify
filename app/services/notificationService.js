module.exports = (models) => {
    var module = {};
    var https = require('https');
    var messageService = require("../services/messageService.js")(models);
    var config = require('../../config/onesignal/config.json');

    module.sendNotification = function (message, subject, locationId, user) {
        return new Promise(function (resolve, reject) {
            messageService.insert({
                extid: "",
                receipients: 0,
                subject: subject,
                text: message.contents.en,
                userId: user.id
            }, locationId).then(function (msg) {
                message["app_id"] = config.api_id;
                message["url"] = `https://enotify.iodrop.net/message/view?id=${msg.id}`;

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

                var req = https.request(options, function (res) {
                    res.on('data', function (data) {
                        var rdata = JSON.parse(data);
                        messageService.update({
                            id: msg.id,
                            extid: rdata.id,
                            receipients: rdata.recipients,
                            subject: msg.subject,
                            text: msg.text,
                            userId: msg.userId
                        });
                    });
                });

            req.on('error', function (e) {
                console.log("ERROR:");
                console.log(e);
                reject(e);
            });

            req.write(JSON.stringify(message));
            req.end();
            resolve(msg.id);
        });
    });
};

module.cancelNotification = function (id) {

    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic " + config.api_key
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications/" + id + "?app_id=" + config.api_id,
        method: "DELETE",
        headers: headers
    };

    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            var rdata = JSON.parse(data);
            console.log(rdata);
        });
    });

    req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
    });
}

module.getNotification = function (id) {

    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic " + config.api_key
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications/" + id + "?app_id=" + config.api_id,
        method: "GET",
        headers: headers
    };

    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            var rdata = JSON.parse(data);
            console.log(rdata);
            return rdata;
        });
    });

    req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
        return e;
    });
}

module.getNotifications = function (id) {

    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic " + config.api_key
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications/notifications?app_id=" + config.api_id,
        method: "GET",
        headers: headers
    };

    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            var rdata = JSON.parse(data);
            console.log(rdata);
            return rdata;
        });
    });

    req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
        return e;
    });
}

module.getDevice = function (id) {

    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic " + config.api_key
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/players/" + id + "?app_id=" + config.api_id,
        method: "GET",
        headers: headers
    };

    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            var rdata = JSON.parse(data);
            console.log(rdata);
            return rdata;
        });
    });

    req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
        return e;
    });
}

module.getDevices = function (limit = 300, offset = 0) {

    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic " + config.api_key
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/players?app_id=" + config.api_id + "&limit=" + limit + "&offset=" + offset,
        method: "GET",
        headers: headers
    };

    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            var rdata = JSON.parse(data);
            return rdata;
        });
    });

    req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
        return e;
    });
}

return module;
}