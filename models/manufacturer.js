var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var manufacturerSchema = new Schema({
<<<<<<< HEAD
  name: {type: String, required: true},
  code: {type: String, required: true, unique: true}
=======
  name: String,
  code: String,
  isVerified: Boolean
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
