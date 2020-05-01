var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: String,
    departureTime: String,
    price: Number,
  });

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    orders: [orderSchema]

})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;