var router = require('express').Router();
var passport = require('passport');

var resource = require('../services/resource-service');

// acl
router.use('/api', passport.authenticate('jwt', {session: false}));

router.use('/api/administrator-accounts', resource('AdministratorAccount'));
router.use('/api/customer-accounts', resource('CustomerAccount'));
router.use('/api/manufacturer-accounts', resource('ManufacturerAccount'));

router.use('/api/roles', resource('Role'));
router.use('/api/permissions', resource('Permission'));

router.use('/api/manufacturers', resource('Manufacturer'));
router.use('/api/batches', resource('Batch'));
router.use('/api/models', resource('Model'));

module.exports = router;
