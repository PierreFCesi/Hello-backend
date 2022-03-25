//Imports
var express = require('express');
var usersCtrl = require('./routes/usersController');

//Router
exports.router = (function() {
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    return apiRouter;
})();