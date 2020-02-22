var exports = module.exports = {}

exports.home = function(req, res) {

    // Get all models
    var models = require("../models");

    // Get the user model
    var User = models.user;

    // select firstname, lastname from user
    User.findAll({
        attributes: ['firstname', 'lastname'] 
      }).then((users) => { 
        users.every(user => console.log(user.firstname + ' ' + user.lastname));
 
        // Render home view and pass in users
        res.render('home',users);
    });
}
