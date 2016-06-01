var mongoose = require('mongoose');
var nconf = require('nconf');

mongoose.connect(nconf.get('mongodb'));

require('./models/administrator-account');
require('./models/batch');
require('./models/customer-account');
require('./models/device');
require('./models/manufacturer-account');
require('./models/permission');
require('./models/role');
