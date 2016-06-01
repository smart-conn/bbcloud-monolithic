var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var manufacturerAccountSchema = new Schema({
  wechatOpenId: String,
  mobilePhoneNumber: String,
  salt: String,
  hash: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

manufacturerAccountSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('ManufacturerAccount', manufacturerAccountSchema);
