var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RevokeTokenSchema = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    uid: String, //存储管理员的roleID，或者custmerID，或者厂家ID
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('RevokeToken', RevokeTokenSchema);