var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RevokeSchema = new Schema({
    token: String,
    timestamp: {
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model('RevokeToken', RevokeSchema);
