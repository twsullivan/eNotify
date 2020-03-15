module.exports = (models) => {
    var module = {};

    module.get = function (id) {
        return models.location.findByPk(id);
    }

    module.insert = function (location) {

        // location = {
        //     name: 
        //     longitude: 
        //     latitude: 
        //     radius: 
        // }

        return models.location.create(location);
    }

    module.update = function (location) {

        return new Promise(function (resolve, reject) {

            models.location.findByPk({
                id: location.id
            })
                .then(data => {
                    data.updateAttributes({
                        name: location.name,
                        longitude: location.longitude,
                        latitude: location.latitude,
                        radius: location.radius
                    })
                        .then(data => {
                            resolve(data);
                        });
                });
        });
    }

    module.delete = function (id) {
        return models.location.destroy({
            id: id
        });
    }

    return module;
}