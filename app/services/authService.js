module.exports = (models) => {
    var moment = require('moment');
    var bCrypt = require('bcrypt-nodejs');
    var sequelize = require("sequelize");
    var module = {};

    module.reset = function (req) {
        console.log(JSON.stringify(req.user));
        return new Promise(function (resolve, reject) {
            models.user.findOne({
                where: {
                    email: req.body.email
                }
            }).then(function (user) {
                var data = {
                    "email": user.email,
                    "firstname": user.firstname,
                    "lastname": user.lastname,
                    "password": req.body.newPassword
                };
                
                models.user.destroy({
                    where: {
                        email: req.body.email
                    }
                }).then(function(){
                    post(data)
                    resolve(true);
                })
            });
        });
    }

    module.delete = function (email) {
        return models.user.destroy({
            where: {
                email: email
            }
        });
    }

    function post(d) {
        const https = require('https')

        const data = JSON.stringify(d);

        const options = {
            hostname: 'enotify.iodrop.net',
            port: 443,
            path: '/signup',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log("user: ", res.user)
            res.on('data', d => {
                process.stdout.write(d)
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.write(data)
        req.end()
    }

    return module;
}