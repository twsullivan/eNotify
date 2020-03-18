module.exports = function(sequelize, Sequelize) {

    var Device = sequelize.define('device', {
        
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        deviceId: {
            type: Sequelize.TEXT,
            notEmpty: true
        },

        extId: {
            type: Sequelize.UUID
        }
    });

    Device.associate = (models, options) => {
        models.device.belongsTo(models.location);
    }

    return Device;
 
}