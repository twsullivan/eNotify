module.exports = (models) => {
    var module = {};

    module.get = function (id) {
        return models.location.findByPk(id);
    }

    module.getAll = function () {
        return models.location.findAll();
    }

    module.insert = function (location) {

        return models.location.create({
            name: location.name
        });
    }

    module.update = function (location) {

        return models.location.update({
            name: location.name
        }, {
            where: {
                id: location.id
            }
        });
    }

    module.delete = function (id) {
        return models.location.destroy({ where: {id: id} });
    }

    return module;
}