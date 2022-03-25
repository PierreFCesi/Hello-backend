//Imports
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
//var models = require('../models');
var asyncLib = require('async');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

//Routes
module.exports = {
    login: function(req, res){
        //Params
        var email = req.body.email;
        var password = req.body.password;

        if(email == null || password == null){
            return res.status(400).json({'error': 'missing parameters'});
        }

       /* asyncLib.waterfall([
            function(done){
                models.users.findOne({
                    where: {usr_email:email}
                }).then(function(userFound){
                   done(null, userFound);
                }).catch(function(err){
                    return res.status(500).json({'error': 'unable to verify user'})
                })
            },
            function(userFound, done){
                if(userFound){
                    bcrypt.compare(password, userFound.usr_password, function(errBycrypt, resBycrypt){
                        done(null, userFound, resBycrypt);
                    });
                } else{
                    return res.status(404).json({'error': 'user not exist'});
                }
            },
            function(userFound, resBycrypt, done){
                if(resBycrypt){
                    done(userFound);
                   
                }else{
                    return res.status(403).json({'error' : 'your email or password is wrong'})
                }
            }
        ],
        function(userFound){
            if(userFound){
                return res.status(200).json({
                    'access_token': jwtUtils.generateTokenForUser(userFound),
                    'expires_in' : jwtUtils.getExpiresIn()
                });
            }else{
                return res.status(500).json({'error': 'Cannot log on user.'})
            }
            
        });*/
    },
    getUserProfile: function(req, res){
        //Getting auth header
        var headerAuth = req.headers['authorization'];
        var userID = jwtUtils.getUserID(headerAuth);
        if(userID < 0 )
            return res.status(400).json({'error': 'Token error'});

       /* models.users.findOne({
            attributes: ['usr_id', 'usr_email', 'usr_pseudo'],
            where: {usr_id: userID}
        }).then(function(user){
            if(user){
                res.status(201).json({
                    'id': user.usr_id,
                    'email': user.usr_email,
                    'pseudo': user.usr_pseudo
                });
            }else{
                res.status(404).json({'error': 'User not found.'});
            }
        }).catch(function(err){
            res.status(500).json({'error': 'cannot fetch user'})
        });*/
    },
    updateUserProfile: function(req, res) {
        // Getting auth header
        var headerAuth  = req.headers['authorization'];
        var userID      = jwtUtils.getUserID(headerAuth);
    
        // Params
        var pseudo = req.body.pseudo;
    
        /*asyncLib.waterfall([
          function(done) {
            models.users.findOne({
              attributes: ['usr_id', 'usr_pseudo'],
              where: { usr_id: userID }
            }).then(function (userFound) {
              done(null, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify user' });
            });
          },
          function(userFound, done) {
            if(userFound) {
              userFound.update({
                usr_pseudo: (pseudo ? pseudo : userFound.pseudo)
              }).then(function() {
                done(userFound);
              }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot update user' });
              });
            } else {
              res.status(404).json({ 'error': 'user not found' });
            }
          },
        ], function(userFound) {
          if (userFound) {
            return res.status(201).json(userFound);
          } else {
            return res.status(500).json({ 'error': 'cannot update user profile' });
          }
        });*/
    }
}