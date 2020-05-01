var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const journeyModel = require('../models/journey')
const orderModel = require('../models/orders')
const userModel = require('../models/users')

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

// --------------------- BDD -----------------------------------------------------
mongoose.connect('mongodb+srv://JeremyP:alvardbcapsule@cluster0-hnrk8.mongodb.net/Ticketac?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
   }
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'test' });
});

router.get('/homepage', function(req, res, next) {
  if(req.session.user===null || req.session.user===undefined){
    res.redirect('/');
  }else{
    res.render('homepage', { title: 'Express' });
  }  
}
);

router.post('/cities', async function(req, res, next) {
  if(req.session.user===null || req.session.user===undefined){
    res.redirect('/');
  }else{
var dateFormat = function(date){
var newDate = new Date(date);
var format = newDate.getDate()+'/'+(newDate.getMonth()+1)+'/'+newDate.getFullYear();
return format;
}
 var newJourney = {
  departure : req.body.toCityFromFront,
  arrival : req.body.fromCityFromFront,
  date : dateFormat(req.body.dateFromFront)
 }


var journeyDate = []
 var journeys = await journeyModel.find({ 
   departure: newJourney.departure, 
   arrival: newJourney.arrival,
  });
  for(var i = 0;i<journeys.length; i++){
  if(dateFormat(journeys[i].date) === newJourney.date){
    console.log("Bravo")
    journeyDate.push({
      departure : journeys[i].departure,
      arrival : journeys[i].arrival,
      date: dateFormat(journeys[i].date),
      departureTime: journeys[i].departureTime,
      price : journeys[i].price
    }) 
  } 
}
console.log(journeyDate)

if(journeyDate.length <=0) {
  res.redirect('/nofound');
} else { 
  res.render('avalaiblejourney', {journeyDate});
  }
}
}
);

router.get('/avalaiblejourney', function(req, res, next) {
  if(req.session.user===null || req.session.user===undefined){
    res.redirect('/');
  }else{
  res.render('avalaiblejourney', {journeyDate: journeyDate});
}
}
);

router.get('/nofound', function(req, res, next) {
  if(req.session.user===null || req.session.user===undefined){
    res.redirect('/');
  }else{
  res.render('nofound', { title: 'Express' });
}
});

router.get('/popup', function(req, res, next) {
  res.render('popup', { title: 'Express' });
});


router.get('/ajout', function(req, res, next) {
  if(req.session.user===null || req.session.user===undefined){
    res.redirect('/');
  }else{
  req.session.panier.push(req.query)
  res.redirect('/plannedjourney', );
}
});
router.get('/supprimer', function(req, res, next) {
  if(req.session.user===null || req.session.user===undefined){
    res.redirect('/');
  }else{
  req.session.panier.splice(req.query.position,1)
  res.redirect('/plannedjourney', );
}
});
router.get('/plannedjourney', function(req, res, next) {
  if(req.session.user===null || req.session.user===undefined){
    res.redirect('/');
  }else{
  res.render('plannedjourney', {  panier:req.session.panier } );
}});
router.get('/save', async function(req, res, next) {
<<<<<<< HEAD

 
  
  
  

  var user = await userModel.findById({_id:req.session.user.id})
  console.log(user.orders)  
  for(var i =0; i<req.session.panier.length; i++){
    
    user.orders.push({
=======
  if(req.session.user===null || req.session.user===undefined){
    res.redirect('/');
  }else{
  var user = await userModel.findById({_id:req.session.user.id})
  for(var i =0; i<req.session.panier.length; i++){
      user.orders.push({
>>>>>>> 60341da540c1aee2ac5f35fc6db103bdafc84046
      departure: req.session.panier[i].villedepart,
      arrival: req.session.panier[i].villearrivee,
      date: req.session.panier[i].date,
      departureTime: req.session.panier[i].heuredepart,
      price: req.session.panier[i].prix,
     }   )
     
    
  } 
  
  var userSaved = await user.save()

  res.redirect('/homepage');
}});
router.get('/lastrip',async function(req, res, next) {
  if(req.session.user===null || req.session.user===undefined){
    res.redirect('/');
  }else{
  var user = await userModel.findById({_id:req.session.user.id})
  var lastrip=[]
  for(var i=0;i<user.orders.length;i++){
    lastrip.push(user.orders[i])
  }
  console.log(lastrip)
  res.render('lastrip', {lastrip} );
}});
// Remplissage de la base de donnée, une fois suffit
// router.get('/save', async function(req, res, next) {

//   // How many journeys we want
//   var count = 300

//   // Save  ---------------------------------------------------
//     for(var i = 0; i< count; i++){

//     departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
//     arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

//     if(departureCity != arrivalCity){

//       var newUser = new journeyModel ({
//         departure: departureCity , 
//         arrival: arrivalCity, 
//         date: date[Math.floor(Math.random() * Math.floor(date.length))],
//         departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
//         price: Math.floor(Math.random() * Math.floor(125)) + 25,
//       });
       
//        await newUser.save();

//     }

//   }
//   res.render('index', { title: 'Express' });
// });


// // Cette route est juste une verification du Save.
// // Vous pouvez choisir de la garder ou la supprimer.
// router.get('/result', function(req, res, next) {

//   // Permet de savoir combien de trajets il y a par ville en base
//   for(i=0; i<city.length; i++){

//     journeyModel.find( 
//       { departure: city[i] } , //filtre
  
//       function (err, journey) {

//           console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
//       }
//     )

//   }


//   res.render('index', { title: 'Express' });
// });

module.exports = router;
