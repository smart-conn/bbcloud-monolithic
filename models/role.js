var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
  name: String,
  permissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Permission'
  }],
  adminAccounts: [{
    type: Schema.Types.ObjectId,
    ref: 'AdministratorAccount'
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  deletedAt: Date
});

var Role = mongoose.model('Role', roleSchema);

module.exports = Role;
