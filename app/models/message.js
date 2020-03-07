module.exports = function(sequelize, Sequelize) {

    var Message = sequelize.define('message', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        extid: {
            type: Sequelize.UUID
        },

        receipients: {
            type: Sequelize.INTEGER
        },

        text: {
            type: Sequelize.TEXT,
            notEmpty: true
        }
    });
 
    Message.associate = (models, options) => {
        Message.belongsTo(models.user, options);
    };

    return Message;
 
}