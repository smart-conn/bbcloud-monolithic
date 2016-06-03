var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SendEmailLogSchema = new Schema({
    id: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'ManufacturerAccount'
    },
    type: String,
    timestamp: {
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model('SendEmailLog', SendEmailLogSchema);
