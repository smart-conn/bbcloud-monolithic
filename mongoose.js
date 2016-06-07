var mongoose = require('mongoose');
var nconf = require('nconf');

mongoose.connect(nconf.get('mongodb'));

require('./models/administrator-account');
require('./models/customer-account');
require('./models/manufacturer-account');

require('./models/permission');
require('./models/role');

require('./models/manufacturer');
require('./models/batch');
require('./models/model');

require('./models/device');
