module.exports = (models) => {
    var moment = require('moment');
    var sequelize = require("sequelize");
    var module = {};

    module.getDeviceById = function (extId) {
        return models.device.findAll({ where: { extId: extId } });
    }

    module.insert = function (device) {
        console.log("device :", device);
        return models.device.create(device);
    }

    module.update = function (extId, locationId) {

        return models.device.update({
            where: { extId: extId }
        }, 
        {
            locationId: locationId
        });
    }

    module.delete = function (extId, locationId) {
        return models.device.destroy({ where: {extId: extId, locationId: locationId }});
    }

    module.deleteLocation = function (locationId) {
        return models.device.destroy({where: {locationId: locationId}});
    }
    return module;
}