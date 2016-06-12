'use strict';
const router = require('express').Router();
const passport = require('passport');
const expressJwt = require('express-jwt');
const mongoose = require('mongoose');
const nconf = require('nconf');

var resource = require('../services/resource-service');

// 验证Token是否有效
// 使用方法：expressJwt({ secret: 'secret', isRevoked: this._expressJwtRevoked })
// todo: 做成一个公共方法
function _expressJwtRevoked(req, payload, done) {
  let jti = payload.jti;
  let RevokeToken = mongoose.model('RevokeToken');
  if (!!!jti) {
    return done(null, "Invalid token.");
  } else {
    RevokeToken.findById(jti, (err, doc) => {
      if (err || !!!doc || !doc.active) {
        return done(null, "Invalid token.");
      } else {
        return done();
      }
    });
  }
}

// acl
router.use('/api', expressJwt({
  secret: nconf.get('secret'),
  isRevoked: _expressJwtRevoked
}));

router.use('/api', function(req, res, next) {
  if (req.user.realm === 'administrator') {
    try {
      req.scope = req.user.scope.split(',')
    } catch (err) {}
  }
  next();
});

router.use('/api/batches', function(req, res, next) {
  if (req.user.realm === 'manufacturer') {
    try {
      req.body.manufacturer = req.user.manufacturer;
    } catch (err) {}
    req.query._filters = req.query._filters || {};
    req.query._filters.manufacturer = req.user.manufacturer;
    console.log(req.query);
    console.log('add addition =========== batch');
  }
  next();
});

router.use('/api/models', function(req, res, next) {
  if (req.user.realm === 'manufacturer') {
    try {
      req.body.manufacturer = req.user.manufacturer;
    } catch (err) {}
    req.query._filters = req.query._filters || {};
    req.query._filters.manufacturer = req.user.manufacturer;
    console.log(req.query);
    console.log('add addition =========== model');
  }
  next();
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