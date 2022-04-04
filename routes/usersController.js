//Imports
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

//Routes
module.exports = {
  create: function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        var params = {
            email : req.body.email,
            password :req.body.password,
            role : req.body.role,
            firstname : req.body.firstname,
            lastname : req.body.lastname
        };
        
        if(params.email == null || params.password == null || params.role == null  || params.firstname == null || params.lastname == null )
        
        if(!EMAIL_REGEX.test(params.email)){
            return res.status(400).json({'error':'Email is not valid'});
        }

        if(!PWD_REGEX.test(params.password)){
            return res.status(400).json({'error':'password invalid (must length 4 - 8 and include 1 number at least one upper case letter, one lower case letter )'});
        }

        asyncLib.waterfall([
            function(done){
                models.Users.findOne({
                    attributes: ['email'],
                    where: {email: params.email}
                }).then(function(userFound){
                    done(null, userFound);
                }).catch(function(err){
                    return res.status(500).json({'error': 'Unable to verify user.'})
                });
            },
            function(userFound, done){
                if(!userFound){
                    bcrypt.hash(params.password, 5, function(err, bcryptedPassword){
                        done(null, userFound, bcryptedPassword);
                    });
                }else{
                    return res.status(409).json({
                        'error': 'This user is already exist.'
                    })
                }
            },
            function(userFound, bcryptedPassword, done){
                var newProfile = models.Profiles.create({
                    firstname: params.firstname, lastname: params.lastname, avatar: null
                }).then(function(profile){
                    console.log(profile.dataValues.id)
                    var newUser = models.Users.create({
                        email: params.email,
                        password: bcryptedPassword,
                        rol_id: params.role,
                        prf_id: profile.dataValues.id
                    })
                    .then(function(newUser){
                        done(newUser);
                    })
                    .catch(function(err){
                        console.log(err)
                        return res.status(500).json({'error': 'Cannot add the user.'})
                    });
                }).catch(function(err){
                    console.log(err)
                    return res.status(500).json({'error': 'Cannot add the profile of user.'})
                });
                
            }
        ], function(newUser){
            if(newUser){
                console.log(newUser)
                return res.status(200).json({
                    'access_token': jwtUtils.generateTokenForUser(newUser),
                    'expires_in' : jwtUtils.getExpiresIn()
                });
            }else{
                return res.status(500).json({'error': 'Cannot add the user.'})
            }
        });
    },
    login: function(req, res){
        //Params
        var email = req.body.email;
        var password = req.body.password;

        if(email == null || password == null){
            return res.status(400).json({'error': 'missing parameters'});
        }

        asyncLib.waterfall([
            function(done){
                models.Users.findOne({
                    where: {email:email}
                }).then(function(userFound){
                   done(null, userFound);
                }).catch(function(err){
                    return res.status(500).json({'error': 'unable to verify user'})
                })
            },
            function(userFound, done){
                if(userFound){
                    bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
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
            
        });
    },
    getUserProfile: function(req, res){
        //Getting auth header
        var headerAuth = req.headers['authorization'];
        var userID = jwtUtils.getUserID(headerAuth);
        if(userID < 0 )
            return res.status(400).json({'error': 'Token error'});

        models.users.findOne({
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
        });
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