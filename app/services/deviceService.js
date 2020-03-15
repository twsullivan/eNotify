module.exports = (models) => {
    var moment = require('moment');
    var sequelize = require("sequelize");
    var module = {};

    module.getDeviceById = function (deviceId) {
        return models.device.findOne({ where: { deviceId: deviceId } });
    }

    module.insert = function (device) {
        return models.device.create(device);
    }

    return module;
}