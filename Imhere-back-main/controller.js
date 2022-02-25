const jwt = require('jsonwebtoken');
const os = require("os")
const env = require('dotenv').config()
//console.log(env)


const  testFunction = (req, res, username) => {
	console.log('test')
}
const generateAccessToken = (username) => {
	return jwt.sign({username: username}, env['parsed']['TOKEN_SECRET'], {expiresIn: "10s"})
}

module.exports = {
	testFunction, 
	generateAccessToken
}