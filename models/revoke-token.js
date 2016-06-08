var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RevokeTokenSchema = new Schema({
    active: { type: Boolean, default: true },
    timestamp: {
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model('RevokeToken', RevokeTokenSchema);
