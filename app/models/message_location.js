module.exports = function(sequelize, Sequelize) {

    var MessageLocation = sequelize.define('message_location', {
        
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        }
    });

    MessageLocation.associate = (models, options) => {
        models.message.belongsToMany(models.location, {through: MessageLocation});
        models.location.belongsToMany(models.message, {through: MessageLocation});
    }

    return MessageLocation;
 
}