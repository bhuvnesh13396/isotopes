const jwt = require('express-jwt');
//var secret = require('../config').secret;

const getTokenFromHeaders = (req) => {
  console.log("Inside Auth.js ",req.headers);
  const { headers : { authorization } } = req;

  console.log("Authorisation ",authorization);

  if(authorization && authorization.split(' ')[1]==='Token'){
    console.log('#################################----------Auth---------------###############');
    console.log(authorization.split(' ')[2]);
    return authorization.split(' ')[2];
  }

  return null;
};

const auth = {
  required : jwt({
    secret : 'secret',
    userProperty : 'payload',
    getToken : getTokenFromHeaders
  }),

  optional : jwt({
    secret : 'secret',
    userProperty : 'payload',
    getToken : getTokenFromHeaders,
    credentialsRequired : false,
  })
};

module.exports = auth;
