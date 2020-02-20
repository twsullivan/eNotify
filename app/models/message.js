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
            notEmpty: true,
            // references: {
            //     model: 'user',
            //     key: 'id'
            // } 
        },

        locationId: {
            type: Sequelize.INTEGER,
            notEmpty: true,
            // references: {
            //     model: 'location',
            //     key: 'id'
            // }
        }
    });
 
    return Message;
 
}