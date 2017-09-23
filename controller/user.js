var users = require("../model/puffclients.js");  
var jwt = require("jwt-simple");  

var cfg = require("../config.js");


exports.getUserToken = function(req,res)  {  
    if (req.body.login_id && req.body.password) {
        var login_id = req.body.login_id;
        var password = req.body.password;
        var user = users.find(function(u) {
            return u.login_id === login_id && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.id
            };
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.json({
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
};

exports.login = function(req, res, next){
 
    var userInfo = setUserInfo(req.user);
 
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
 
}

 function setUserInfo(request){
    return {
        _id: request._id,
        login_id: request.login_id,
        role: request.role
    };
}