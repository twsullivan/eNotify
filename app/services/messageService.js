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
                include: [{ model: models.user }, { model: models.location }],
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then(data => {

                // Group rows in object using createdAt
                var groups = data.reduce(function (groups, row) {

                    var d = new Date(row.createdAt);
                    //var strDate = (d.getMonth() + 1).padLeft(2) + '/' + (d.getDate() + 1).padLeft(2) + '/' + d.getFullYear();
                    strDate = moment(d).format("dddd, MMMM D, YYYY");

                    if (!groups[strDate]) groups[strDate] = [];

                    groups[strDate].push(row);

                    return groups;

                }, Object.create(null));

                resolve(groups);
            })
        });

    }

    module.get = function (id) {
        return models.message.findAll({
            include: [{ model: models.user }, { model: models.location }],
            where: { id: id }
        });
    }

    module.insert = function (message, locationId) {
        return new Promise(function (resolve, reject) {
            models.message.create(message).then(msg => {
                msg.addLocations(locationId);
                resolve(msg);
            });
        });
    }

    module.update = function (msg) {
        return models.message.update({
            extid: msg.extid,
            receipients: msg.receipients,
            text: msg.text
        }, {
            where: {
                id: msg.id
            }
        });
    }

    module.delete = function (id) {
        return models.message.destroy({
            id: id
        });
    }

    module.increment = function (id) {

        return models.message.findOne({
            where: {
              extid: id
            }
          }).then(result => { result.increment('received') });
    }
    
    return module;
}