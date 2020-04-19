module.exports = (models) => {
    var module = {};

    module.get = function (extid) {
        return models.device.findAll({
            where: {
                extid: device.extid
            }
        });
    }

    module.getAll = function () {
        return models.device.findAll();
    }

    module.insert = function (device) {

        return models.device.create({
            extid: device.extid,
            locationId: device.locationId
        });
    }

    module.update = function (device) {

        return models.device.update({
            name: device.name
        }, {
            where: {
                id: device.id
            }
        });
    }

    module.delete = function (device) {
        return models.device.destroy({
            where: {
                extid: device.extid,
                locationId: device.locationId
            }
        });
    }

    return module;
}