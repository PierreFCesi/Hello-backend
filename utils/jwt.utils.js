//Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = "a1he54ry8j4o5l41nb1zrthg1r1bf1v5zf1b6zr4648k45tu1n21av5aeve";
const EXPIRES_IN = '24h';

//Exported finctions
module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            userID: userData.id,
            role: userData.role
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: EXPIRES_IN
        })
    },
    getExpiresIn: function(){
        return EXPIRES_IN;
    },
    parseAuthorization: function(authorization){
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserID: function(authorization){
        var userID = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null){
            try{
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                console.log(jwt.verify(token, JWT_SIGN_SECRET));
                if(jwtToken != null)
                    userID = jwtToken.userID;
            }catch(err){}
        }
        return userID;
    }
}