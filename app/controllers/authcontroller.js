var exports = module.exports = {}

exports.home = function(req, res) {

    res.render('home');

}

exports.locate = function(req, res) {
    res.render('locate');
}

exports.signup = function(req, res) {
 
    res.render('signup');
 
}

exports.signin = function(req, res) {
 
    res.render('login');
 
}

exports.dashboard = function(req, res) {
 
    res.render('dashboard');
 
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/signin');
 
    });
 
}