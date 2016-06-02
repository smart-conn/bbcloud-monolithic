var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
<<<<<<< HEAD
  name: {type: String, required: true, unique: true},
  permissions: [{type: Schema.Types.ObjectId, ref: 'Permission'}],
=======
  name: String,
  permissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Permission'
  }],
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  deletedAt: Date
});

var Role = mongoose.model('Role', roleSchema);

module.exports = Role;
