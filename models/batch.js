var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var batchSchema = new Schema({
  model: {type: Schema.Types.ObjectId, ref: 'Model'},
  manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer'},
  amount: Number,
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Batch', batchSchema);
