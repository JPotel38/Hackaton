var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
  });
  
  var orderModel = mongoose.model('order', orderSchema);

  module.exports = orderModel;