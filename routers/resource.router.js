var router = require('express').Router();
var passport = require('passport');

var resource = require('../services/resource-service');

// acl
router.use('/api', passport.authenticate('jwt', {session: false}));

router.use('/api', function(req, res, next) {
  if (req.user.realm === 'administrator') {
    try {req.scope = req.user.scope.split(',')} catch(err) {}
  }
  next();
});

router.use('/api/batches', function(req, res, next) {
  if (req.user.realm === 'manufacturer') {
    try {req.body.manufacturer = req.user.manufacturer;} catch(err) {}
    req.query._filters = req.query._filters || {};
    req.query._filters.manufacturer = req.user.manufacturer;
    console.log(req.query);
    console.log('add addition =========== batch');
  }
  next();
});

router.use('/api/models', function(req, res, next) {
  if (req.user.realm === 'manufacturer') {
    try {req.body.manufacturer = req.user.manufacturer;} catch(err) {}
    req.query._filters = req.query._filters || {};
    req.query._filters.manufacturer = req.user.manufacturer;
    console.log(req.query);
    console.log('add addition =========== model');
  }
  next();
});

router.post('/api/administrator-accounts', function(req, res, next) {
  var mongoose = require('mongoose');
  var password = req.body.password;
  var AdministratorAccount = mongoose.model('AdministratorAccount');

  delete req.body.password;

  var administratorAccount = new AdministratorAccount(req.body);
  administratorAccount.save().then(function() {
    return administratorAccount.setPassword(password);
  }).then(function() {
    return administratorAccount.save();
  }).then(function() {
    var reply = administratorAccount.toObject();
    reply.id = reply._id;
    delete reply._id;
    res.json(reply);
  }).catch(next);
});

router.use('/api', resource('administrator-accounts', 'AdministratorAccount'));
router.use('/api', resource('customer-accounts', 'CustomerAccount'));
router.use('/api', resource('manufacturer-accounts', 'ManufacturerAccount'));

router.use('/api', resource('roles', 'Role'));
router.use('/api', resource('permissions', 'Permission'));

router.use('/api', resource('manufacturers', 'Manufacturer'));
router.use('/api', resource('batches', 'Batch'));
router.use('/api', resource('models', 'Model'));

module.exports = router;
