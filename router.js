//Imports
var express = require('express');
var usersCtrl = require('./routes/usersController');

//Router
exports.router = (function() {
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/auth/signup/').post(usersCtrl.create);
    apiRouter.route('/auth/signin/').post(usersCtrl.login);
    apiRouter.route('/admin/').get(usersCtrl.getRoleByToken);
    //apiRouter.route('/users/lout/').get(usersCtrl.getUserProfile);
    return apiRouter;
})();