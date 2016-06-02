var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var customerAccountSchema = new Schema({
  wechatOpenId: String,
  mobilePhoneNumber: String,
  salt: String,
  hash: String,
  createdAt: {type: Date, default: Date.now}
});

customerAccountSchema.plugin(passportLocalMongoose, {
  usernameField: 'mobilePhoneNumber'
});

module.exports = mongoose.model('CustomerAccount', customerAccountSchema);
