module.exports = function(sequelize, Sequelize) {

    var Message = sequelize.define('message', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        sent: {
            type: Sequelize.DATE,
            notEmpty: true
        },

        sentBy: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },

        locationId: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }
    });
 

    Message.associate = (models, options) => {
        Message.hasOne(models.user, options);
        Message.hasMany(models.location, options);
    }

    // Message.associate = (models, options) => {
    //     Message.hasMany(models.location, options)
    // }

    return Message;
 
}