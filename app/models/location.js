module.exports = function(sequelize, Sequelize) {
 
    var Location = sequelize.define('location', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        name: {
            type: Sequelize.TEXT,
            notEmpty: true
        },

    });
 
    return Location;
 
}
