var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelSchema = new Schema({
  name: String,
  code: String,
  manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer'}
});

module.exports = mongoose.model('Model', modelSchema);
