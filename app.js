// IMPORTS
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./router').router;
var cors = require('cors');

//INSTANTIATE SERVER
var server = express();

//BODYPARSER Config
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cors());

//CONFIGURE ROUTES
server.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hello World</h1>');
});

server.use('/api/', apiRouter);

//LAUNCH SERVER
server.listen(5000, function() {
    console.log('Server launched...');
});