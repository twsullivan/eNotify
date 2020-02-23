var exports = module.exports = {}

var moment = require('moment');
var sequelize = require("sequelize");
var models = require("../models");

exports.home = function(req, res) {

    // Get the user model
    var Users = models.user;
    var Messages = models.message;

    // SELECT DISTINCT(date(`createdAt`)) AS `createdAt`, `id` FROM `messages` AS `message`
    Messages.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.fn('date', sequelize.col('createdAt'))), 'createdAt'], 'id'],
        where:{}
      }).then(data => {})

    //   Messages.findAll({
    //     include: [{
    //       model: message_location,
    //       required: true
    //      }]
    //   }).then(posts => {
    //     /* ... */
    //   });

    // select firstname, lastname from user
    Users.findAll({

        attributes: ['firstname', 'lastname'] 

      }).then((users) => { 

        users.every(user => console.log(user.firstname + ' ' + user.lastname));
 
        // Render home view and pass in users
        res.render('home',users);
    });
}
