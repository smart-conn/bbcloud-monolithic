var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var batchSchema = new Schema({
<<<<<<< HEAD
  model: {type: Schema.Types.ObjectId, ref: 'Model', required: true},
  manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true},
  amount: {type: Number, required: true},
=======
  model: {type: Schema.Types.ObjectId, ref: 'Model'},
  manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer'},
  amount: Number,
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Batch', batchSchema);
