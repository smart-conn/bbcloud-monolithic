var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var customerAccountSchema = new Schema({
  wechatOpenId: {type: String, unique: true, sparse: true},
  mobilePhoneNumber: {type: String, unique: true, sparse: true},
  salt: String,
  hash: String,
  name: String,
  deviceIds:{type: Array,default:[]},
  socialAccount:{type: String, unique: true, sparse: true},
  socialPassword:String,
  createdAt: {type: Date, default: Date.now}
});

customerAccountSchema.plugin(passportLocalMongoose, {
  usernameField: 'mobilePhoneNumber'
});

module.exports = mongoose.model('CustomerAccount', customerAccountSchema);
