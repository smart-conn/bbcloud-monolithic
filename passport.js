var nconf = require('nconf');
var passport = require('passport');
var WeChatStrategy = require('passport-wechat');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var CustomerAccount = require('./models/customer-account');
var AdministratorAccount = require('./models/administrator-account');
var ManufacturerAccount = require('./models/manufacturer-account');

var jwtOpts = {
  secretOrKey: nconf.get('secret'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer')
};

var wechatOpts = {
  appID: nconf.get('wechat:appId'),
  appSecret: nconf.get('wechat:appSecret'),
  client: nconf.get('wechat:client'),
  callbackURL: nconf.get('wechat:callbackUrl'),
  scope: nconf.get('wechat:scope'),
  state: nconf.get('wechat:state')
};

passport.use('customer', CustomerAccount.createStrategy());
passport.use('administrator', AdministratorAccount.createStrategy());
passport.use('manufacturer', ManufacturerAccount.createStrategy());
passport.use(new WeChatStrategy(wechatOpts, wechatVerify));
passport.use(new JwtStrategy(jwtOpts, jwtVerify));

function wechatVerify(accessToken, refreshToken, profile, done) {
  done();
}

function jwtVerify(payload, done) {
  var id = payload.sub;
  payload.id = id;
  done(null, payload);
}
