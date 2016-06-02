var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var customerAccountSchema = new Schema({
<<<<<<< HEAD
  wechatOpenId: {type: String, unique: true},
  mobilePhoneNumber: {type: String, unique: true},
=======
  wechatOpenId: String,
  mobilePhoneNumber: String,
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
  salt: String,
  hash: String,
  createdAt: {type: Date, default: Date.now}
});

customerAccountSchema.plugin(passportLocalMongoose, {
  usernameField: 'mobilePhoneNumber'
});

module.exports = mongoose.model('CustomerAccount', customerAccountSchema);
