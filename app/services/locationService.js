module.exports = (models) => {
    var module = {};

    module.get = function (id) {
        return models.location.findByPk(id);
    }

    module.getAll = function () {
        return models.location.findAll();
    }

    module.insert = function (location) {

        return models.location.create(location);
    }

    module.update = function (location) {

        return models.location.update({
            name: location.name,
            longitude: location.longitude,
            latitude: location.latitude,
            radius: location.radius
        }, {
            where: {
                id: location.id
            }
        });
    }

    module.delete = function (id) {
        return models.location.destroy({
            id: id
        });
    }

    return module;
}