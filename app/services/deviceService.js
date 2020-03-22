module.exports = (models) => {
    var moment = require('moment');
    var sequelize = require("sequelize");
    var module = {};

    module.getDeviceById = function (deviceId, extId) {
        if (deviceId)
            return models.device.findOne({ where: { deviceId: deviceId } });
        else
            return models.device.findOne({ where: { extId: extId } });
    }

    module.insert = function (device) {
        return models.device.create(device);
    }

    module.update = function (device) {

        return new Promise(function (resolve, reject) {

            models.device.findOne({
                where: { extId: extId } 
            })
                .then(data => {
                    data.updateAttributes({
                        deviceId: data.deviceId,
                        extId: data.extId,
                        locationId: data.locationId
                    })
                        .then(data => {
                            resolve(data);
                        });
                });
        });
    }

    return module;
}