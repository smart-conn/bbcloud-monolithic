var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var manufacturerAccountSchema = new Schema({
  email: String,
  salt: String,
  hash: String,
  manufacturer: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Manufacturer'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

manufacturerAccountSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('ManufacturerAccount', manufacturerAccountSchema);
