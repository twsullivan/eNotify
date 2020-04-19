module.exports = (models) => {
    var module = {};

    module.getUser = function (extid) {
        return models.user.findOne({
            where: {
                id: id
            }
        });
    }

    module.getUsers = function (extid) {
        return models.user.findAll();
    }

    module.update = function (id, permissions) {

        return models.device.update({
            permissions: permissions
        }, {
            where: {
                id: id
            }
        });
    }

    module.delete = function (id) {
        return models.device.destroy({
            where: {
                id: id
            }
        });
    }

    return module;
}