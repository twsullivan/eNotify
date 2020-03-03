var moment = require('moment');
var sequelize = require("sequelize");

exports.getMessages = function(models) {

    var Messages = models.message;

    return Messages.findAll({
        attributes: [[sequelize.fn('date', sequelize.col('createdAt')), 'createdAt'], 
          [sequelize.fn('count', sequelize.col('id')),'count']], 
        group: [[sequelize.fn('date', sequelize.col('createdAt')), 'createdAt']]
      });
}

exports.getMessagesByDate = function(models, d) {
    var Messages = models.message;
    console.log(d);
    return Messages.findAll({
        attributes: {
            include: [[
                sequelize.literal(`(
                SELECT CONCAT(firstname,' ',lastname) AS name
                FROM users
                WHERE
                    users.id = userId
            )`), 'name'
            ]]
        },
        where: sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '=', sequelize.fn('date', new Date(d)))
    })
}

exports.getMessage = function(models) {
    return null;
}

exports.sendMessage = function(message) {
    return null;
}