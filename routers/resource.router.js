var router = require('express').Router();
var passport = require('passport');

var resource = require('../services/resource-service');

// acl
router.use('/api', passport.authenticate('jwt', {session: false}));

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

router.use('/api/administrator-accounts', resource('AdministratorAccount'));
router.use('/api/customer-accounts', resource('CustomerAccount'));
router.use('/api/manufacturer-accounts', resource('ManufacturerAccount'));

router.use('/api/roles', resource('Role'));
router.use('/api/permissions', resource('Permission'));

router.use('/api/manufacturers', resource('Manufacturer'));
router.use('/api/batches', resource('Batch'));
router.use('/api/models', resource('Model'));

module.exports = router;
