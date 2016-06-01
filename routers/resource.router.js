var router = require('express').Router();
var passport = require('passport');

var resource = require('../services/resource-service');

// acl
router.use('/api', passport.authenticate('jwt', {session: false}));

router.use('/api/administrators', resource('AdministratorAccount'));
router.use('/api/roles', resource('Role'));
router.use('/api/permissions', resource('Permission'));
router.use('/api/customers', resource('CustomerAccount'));
router.use('/api/manufacturers', resource('ManufacturerAccount'));

module.exports = router;
