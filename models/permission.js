var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permissionSchema = new Schema({
    name: String,
    roles: [{
        type: Schema.Types.ObjectId, ref: 'Role'
    }],
    menuItem: [{
        type: Schema.Types.ObjectId, ref: 'MenuItem'
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    deletedAt: Date
});

var Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;