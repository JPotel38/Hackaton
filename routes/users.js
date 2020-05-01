var express = require('express');
var router = express.Router();
var userModel= require('../models/users')

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })
  
  if(!searchUser){
    var newUser = new userModel({
      name: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      name: newUserSave.name,
      id: newUserSave._id,
    }
  
    console.log(req.session.user.id)
  
    res.redirect('/homepage')
  } else {
    res.redirect('/')
  }
  
})

router.post('/sign-in', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront
  })

  if(searchUser!= null){
    console.log(searchUser)
    req.session.user = {
      name: searchUser.name,
      id: searchUser._id
    }
    res.redirect('/homepage')
  } else {
    res.render('login')
  }
console.log(req.session.user.id)
  
})

router.get('/logout', function(req,res,next){

  req.session.user = null;
  req.session.panier = [];

  res.redirect('/')
})

module.exports = router;
