var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var administratorAccountSchema = new Schema({
  name: String,
  hash: String,
  salt: String,
  img: String,
  email: String,
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  deletedAt: Date
});

administratorAccountSchema.plugin(passportLocalMongoose, {
  usernameField: 'name'
});

module.exports = mongoose.model('AdministratorAccount', administratorAccountSchema);
