var moment = require('moment');
var sequelize = require("sequelize");

// Pads a number wir string
Number.prototype.padLeft = function (n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
  }
  
// Returns a promise containing a json object of messages grouped by date
exports.getMessages = function (models) {

    return new Promise(function (resolve, reject) {

        // Get messages and order by createdAt date
        models.message.findAll({
            include : [{ model: models.user, model: models.location}],
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

exports.getMessage = function (models) {
    return null;
}

exports.sendMessage = function (message) {
    return null;
}