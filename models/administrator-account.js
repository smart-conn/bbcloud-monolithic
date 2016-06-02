var mongoose = require('mongoose');
var Promise = require('bluebird');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var administratorAccountSchema = new Schema({
<<<<<<< HEAD
  name: {type: String, required: true, unique: true},
  hash: {type: String, required: true},
  salt: {type: String, required: true},
=======
  name: String,
  hash: String,
  salt: String,
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
  role: {type: Schema.Types.ObjectId, ref: 'Role'},
  createdAt: {type: Date, default: Date.now},
  updatedAt: Date,
  deletedAt: Date
});

administratorAccountSchema.plugin(passportLocalMongoose, {
  usernameField: 'name',
  saltField: 'salt',
  hashField: 'hash'
});

var AdministratorAccount = mongoose.model('AdministratorAccount', administratorAccountSchema);

AdministratorAccount.register = Promise.promisify(AdministratorAccount.register, {context: AdministratorAccount});

module.exports = AdministratorAccount;
