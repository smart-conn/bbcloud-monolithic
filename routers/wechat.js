var nconf = require('nconf');
var router = require('express').Router();
var WeChatAPI = require('wechat-api');
var passport = require('passport');

var noSession = {session: false};

var defaultMenu = {
  "button": [
    {
      "type": "view",
      "name": "配网",
      "key": "http://192.168.0.2:3000/network-configure"
    }
  ]
};

var wechat = new WeChatAPI(nconf.get('wechat:appId'), nconf.get('wechat:appSecret'));

// airkiss
router.get('/wechat/network-configure', networkConfigure);
router.get('/wechat/', admin);
router.post('/wechat/action/create-menu', createMenu);

// wechat login
router.post('/customer/auth/wechat/authenticate', passport.authenticate('wechat', noSession), wechatLoginCallback);
router.get('/customer/auth/wechat/callback', wechatLoginCallback);

function wechatLoginIssueToken(req, res, next) {
}

function wechatLoginCallback(req, res, next) {
}

function getFullUrl(req) {
  return req.protocol + '://' + req.get('Host') + req.url;
}

function networkConfigure(req, res, next) {
  var debug = nconf.get('wechat:debug');
  var url = getFullUrl(req);
  var jsApiList = ['configWXDeviceWiFi'];
  var key = nconf.get('airkiss:key');

  return wechat.getJsConfig({debug, jsApiList, url, beta: true}, function(err, wechatConfig) {
    if (err) return next(err);
    res.render('network-configure', {wechatConfig, key});
  });
}

function admin(req, res, next) {
  return wechat.getMenu(function(err, menu) {
    if (err) return res.render('admin', {menu: defaultMenu});
    res.render('admin', {menu: menu.menu});
  });
}

function createMenu(req, res, next) {
  var menu = req.body.menu;
  return wechat.createMenu(menu, function(err) {
    if (err) return next(err);
    res.redirect('back');
  });
}

module.exports = router;
