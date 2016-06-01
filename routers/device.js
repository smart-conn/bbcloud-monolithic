var nconf = require('nconf');
var router = require('express').Router();
var ResourceRouter = require('../lib/resource-router');
var senecaLib = require('seneca');
var passport = require('passport');
var multer = require('multer');

var upload = multer({dest: 'uploads/'});

var deviceClient = senecaLib().client({port: nconf.get('seneca:device:port')});

router.post('/api/batches/aliyun-iot/upload', upload.single('file'), aliyunIoTUpload);
router.post('/api/batches/mac/upload', upload.single('file'), macUpload);

router.use(passport.authenticate('jwt'));
router.use('/api', ResourceRouter('Device', deviceClient));

function aliyunIoTUpload(req, res, next) {

}

function macUpload(req, res, next) {

}

module.exports = router;
