var exports = module.exports = {}


exports.signup = function (req, res) {
    res.send('signup');
}

exports.signin = function (req, res) {
    res.send('signin');
}

exports.dashboard = function (req, res) {
    res.send('dashboard');
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}
