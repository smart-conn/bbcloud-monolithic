var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permissionSchema = new Schema({
<<<<<<< HEAD
  name: {type: String, required: true},
  code: {type: String, required: true, unique: true},
=======
  name: String,
  code: String,
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  deletedAt: Date
});

var Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
