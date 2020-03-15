module.exports = (models) => {
    var moment = require('moment');
    var sequelize = require("sequelize");
    var module = {};

    // Pads a number wir string
    Number.prototype.padLeft = function (n, str) {
        return Array(n - String(this).length + 1).join(str || '0') + this;
    }

    // Returns a promise containing a json object of messages grouped by date
    module.getAll = function () {

        return new Promise(function (resolve, reject) {

            // Get messages and order by createdAt date
            models.message.findAll({
                include: [{ model: models.user, model: models.location }],
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then(data => {

                // Group rows in object using createdAt
                var groups = data.reduce(function (groups, row) {

                    var d = new Date(row.createdAt);
                    var strDate = (d.getMonth() + 1).padLeft(2) + '/' + (d.getDate() + 1).padLeft(2) + '/' + d.getFullYear();

                    if (!groups[strDate]) groups[strDate] = [];

                    groups[strDate].push(row);

                    return groups;

                }, Object.create(null));

                resolve(groups);
            })
        });

    }

    module.get = function (id) {
        return models.message.findByPk(id);
    }

    module.insert = function (message) {

        // message = {
        //     extid: '',
        //     receipients: 0, 
        //     text: ''
        // }
        
        return new Promise(function (resolve, reject) {

            models.message.create(message).then(data => {
                model.message_location.create({
                    messageId: data.id,
                    locationId: data.locationId
                })
                .then(data => {
                    resolve(data);
                })
            });
        });
    }

    module.update = function (message) {

        return new Promise(function (resolve, reject) {

            models.message.findByPk({
                id: message.id
            })
                .then(data => {
                    data.updateAttributes({
                        extid: data.extid,
                        receipients: data.receipients,
                        text: data.text
                    })
                        .then(data => {
                            resolve(data);
                        });
                });
        });
    }

    module.delete = function (id) {
        return models.message.destroy({
            id: id
        });
    }

    return module;
}