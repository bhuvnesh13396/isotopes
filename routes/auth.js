const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {

  const { headers : { authorization } } = req;

  if(authorization && authorization.split(' ')[1]==='Token'){
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
