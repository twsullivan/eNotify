module.exports = function(sequelize, Sequelize) {

    var Device = sequelize.define('device', {
        
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        extId: {
            type: Sequelize.UUID
        },

        locationId: {
            type:Sequelize.INTEGER
        }
    });

    return Device;
 
}