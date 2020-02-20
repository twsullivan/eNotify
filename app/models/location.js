module.exports = function(sequelize, Sequelize) {
 
    var Location = sequelize.define('location', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        name: {
            type: Sequelize.DATE,
            notEmpty: true
        },

        longitude: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },

        latitude: {
            type: Sequelize.FLOAT,
            notEmpty: true,
            
        },

        radius: {
            type: Sequelize.INTEGER,
            notEmpty: true,
            
        }
    });
 
    return Location;
 
}
