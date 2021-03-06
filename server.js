var express    = require('express');
var app        = express();
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var env        = require('dotenv').config();
var exphbs     = require('express-handlebars');
var moment     = require('moment-timezone');

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:false})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: '_layout',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
            return null;
        },
        formatDate: function(date, format){
            return moment.tz(date, "America/Chicago").format(format);
        }
    }
}));
app.set('view engine', '.hbs');

/* app.get('/', function(req, res) {
 
    res.send('Welcome to Passport with Sequelize');

}); */

app.use('/',express.static(__dirname +'/public'));


//Models
var models = require("./app/models");
 
//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function(err) {
 
    if (!err)
        console.log("Site is live");
    else console.log(err)
 
});