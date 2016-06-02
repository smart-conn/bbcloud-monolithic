var router = require('express').Router();
var passport = require('passport');

var resource = require('../services/resource-service');

// acl
router.use('/api', passport.authenticate('jwt', {session: false}));

<<<<<<< HEAD
router.use('/api', function(req, res, next) {
  if (req.user.realm === 'administrator') {
    try {req.scope = req.user.scope.split(',')} catch(err) {}
  }
  next();
});

=======
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
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

<<<<<<< HEAD
router.use('/api', resource('administrator-accounts', 'AdministratorAccount'));
router.use('/api', resource('customer-accounts', 'CustomerAccount'));
router.use('/api', resource('manufacturer-accounts', 'ManufacturerAccount'));

router.use('/api', resource('roles', 'Role'));
router.use('/api', resource('permissions', 'Permission'));

router.use('/api', resource('manufacturers', 'Manufacturer'));
router.use('/api', resource('batches', 'Batch'));
router.use('/api', resource('models', 'Model'));
=======
router.use('/api/administrator-accounts', resource('AdministratorAccount'));
router.use('/api/customer-accounts', resource('CustomerAccount'));
router.use('/api/manufacturer-accounts', resource('ManufacturerAccount'));

router.use('/api/roles', resource('Role'));
router.use('/api/permissions', resource('Permission'));

router.use('/api/manufacturers', resource('Manufacturer'));
router.use('/api/batches', resource('Batch'));
router.use('/api/models', resource('Model'));
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70

module.exports = router;
