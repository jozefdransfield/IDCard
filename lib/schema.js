var mongoose = require("mongoose");

var accountSchema = new mongoose.Schema({
    email: String,
    displayName: String,
    password: String
});

module.exports.Account = mongoose.model('Account', accountSchema);