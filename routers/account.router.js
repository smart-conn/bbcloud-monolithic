var router = require('express').Router();
var passport = require('passport');

var CustomerService = require('../services/account/customer-service');
var AdministratorService = require('../services/account/administrator-service');
var ManufacturerService = require('../services/account/manufacturer-service');


var customerService = new CustomerService();
var administractorService = new AdministratorService();
var manufacturerService = new ManufacturerService();

router.use(customerService.createMiddleware());
router.use(administractorService.createMiddleware());
router.use(manufacturerService.createMiddleware());

router.use(administractorService.changePwd());
router.use(manufacturerService.changePwd());
router.use(manufacturerService.auth());

router.get('/manufacturer/:id/select', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  var realm = req.user.realm;
  var subject = req.user.sub;
  var manufacturer = req.params.id;
  var ManufacturerAccount = require('mongoose').model('ManufacturerAccount');
  ManufacturerAccount.findByIdAndUpdate(subject, {manufacturer}).then(function() {
    var secret = require('nconf').get('secret');
    var token = require('jsonwebtoken').sign({ realm, manufacturer }, secret, { subject });
    res.json({ token });
  }).catch(next);
});

router.post('/customer/auth/wechat', wechatAuthenticate);
router.get('/customer/auth/wechat/callback', passport.authenticate('wechat-web', { session: false }), wechatCallback);

function wechatAuthenticate(req, res, next) {}

function wechatCallback(req, res, next) {}

module.exports = router;
