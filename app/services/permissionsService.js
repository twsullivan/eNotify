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

        return models.user.update({
            permissions: permissions
        }, {
            where: {
                id: id
            }
        });
    }

    return module;
}