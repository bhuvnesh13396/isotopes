const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

// POST user route (optional, everyone has access)
router.post('/', auth.optional , (req,res,next) => {
  console.log("Request Body  ", req.body);
  const { body : { user } } = req;

  if(!user.email){
    return res.status(422).json({
      errors : {
        email : 'is required',
      },

    });
  }

  if(!user.password){
    return res.status(422).json({
      errors : {
        password : 'is required',
      },

    });
  }

  const finalUser = new Users(user);
  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user : finalUser.toAuthJSON() }));
});

// POST login route (optional, everyone has access)
router.post('/login', auth.optional , (req,res,next) => {
  const { body : { user } } = req;

  if(!user.email){
    return res.status(422).json({
      errors : {
        email : 'is required',
      },

    });
  }

  if(!user.password){
    return res.status(422).json({
      errors : {
        password : 'is required',
      },

    });
  }

  return passport.authenticate('local', { session : false }, (err,passportUser,info) => {
      if(err){
        return next(err);
      }

      if(passportUser){
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user : user.toAuthJSON() });
      }

      return status(400).info;
  })(req,res,next);

});


router.get('/current', auth.required, (req,res,next) => {

  const { payload : { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user){
        return res.sendStatus(400);
      }

      return res.json({ user : user.toAuthJSON() });
    });
});


// API to fetch current user's interests
router.get('/current/getInterests' , auth.required , (req,res,next)=> {

  const { payload : {id} } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user){
        return res.sendStatus(400);
      }

      const currentUser = new Users(user);
      const currentUserInterest = currentUser.getUserInterest();

      return (currentUserInterest != null ? res.json(currentUserInterest) : res.sendStatus(404));
     
    });
});

// API to add interests of a user
router.post('/current/addInterests', auth.required, (req,res,next) => {
  
  const { payload : { id } , body : { interests }  } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user){
        return res.sendStatus(400);
      }

      const finalUser = new Users(user);
      // Add the interests from request to User object
      interests.map(interest => {

        finalUser.interests.push({
          name : interest.name,
          reputation : interest.reputation
        });
      });

      /* 
      const currentUserInterest = finalUser.getUserInterest();
      const removeDuplicateInterest = interests.filter(function(interest) {
        const key = interest.name;
        return !this.has(key) && this.add(key);
      }, new Set);

      console.log(removeDuplicateInterest);

      */

      return finalUser.save()
        .then(() => res.json({ user : finalUser.toAuthJSON() }));
    });

});

module.exports = router;
