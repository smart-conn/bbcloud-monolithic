var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelSchema = new Schema({
  name: String,
  code: String
});

module.exports = mongoose.model('Model', modelSchema);
