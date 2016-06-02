var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelSchema = new Schema({
<<<<<<< HEAD
  name: {type: String, required: true},
  code: {type: String, required: true, unique: true},
  manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true}
=======
  name: String,
  code: String,
  manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer'}
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
});

module.exports = mongoose.model('Model', modelSchema);
