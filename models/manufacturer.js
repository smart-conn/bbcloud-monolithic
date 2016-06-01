var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var manufacturerSchema = new Schema({
  name: String,
  code: String,
  isVerified: Boolean
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
