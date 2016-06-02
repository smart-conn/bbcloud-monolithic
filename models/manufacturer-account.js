var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var manufacturerAccountSchema = new Schema({
<<<<<<< HEAD
  email: {type: String, required: true, unique: true},
  salt: {type: String, required: true},
  hash: {type: String, required: true},
  manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer'},
=======
  email: String,
  salt: String,
  hash: String,
  manufacturer: [{type: Schema.Types.ObjectId, ref: 'Manufacturer'}],
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
  createdAt: {type: Date, default: Date.now}
});

manufacturerAccountSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('ManufacturerAccount', manufacturerAccountSchema);
