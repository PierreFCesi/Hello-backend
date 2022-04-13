var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

module.exports = {
    create(req, res){
        var headerAuth = req.headers['authorization'];
        var userID = jwtUtils.getUserID(headerAuth);
        if(userID < 0 )
            return res.status(400).json({'error': 'Token error'});
    
        models.Users.findOne({
            attributes: ['id', 'rol_id'],
            where: {id: userID}
        }).then(function(user){
            if(user.rol_id == 3){
                
            }else{
                res.status(404).json({'error': 'User has no access to this command'});
            }
        }).catch(function(err){
            res.status(500).json({'error': 'cannot fetch user'})
        });
    }
};