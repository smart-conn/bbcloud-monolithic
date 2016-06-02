var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var batchSchema = new Schema({
  model: {type: Schema.Types.ObjectId, ref: 'Model', required: true},
  manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true},
  amount: {type: Number, required: true},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Batch', batchSchema);
