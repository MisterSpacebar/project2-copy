var Account = require('../models/user.js')

module.exports = function(app) {

    app.get('/account', function(req, res){
        console.log("route console log: "+ req.session.cookie.passport.user);
        Account.findAll({
            where: {
                user: req.session.cookie.passport.user
            }
        }).then(function(result){
            res.json(result);
        });
    });
}