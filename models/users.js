var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref : 'order'}]

})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;