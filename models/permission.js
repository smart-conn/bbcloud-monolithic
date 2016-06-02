var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permissionSchema = new Schema({
  name: String,
  code: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  deletedAt: Date
});

var Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
