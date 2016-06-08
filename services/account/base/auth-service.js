'use strict';
const jwt = require('jsonwebtoken');
const nconf = require('nconf');
const mongoose = require('mongoose');
const co = require('co');
const moment = require('moment');

module.exports = class AuthService {

  createMiddleware() {
    const router = require('express').Router();
    const passport = require('passport');

    router.post(`/${this.name}/auth/signup`, this._signupRouter.bind(this));
    router.post(`/${this.name}/auth/login`, passport.authenticate(this.name, { session: false }), this._issueTokenRouter.bind(this));
    return router;
  }

  _issueTokenRouter(req, res, next) {
    const secret = nconf.get('secret');
    const RevokeToken = mongoose.model('RevokeToken');

    let subject = req.user.id;
    this.createTokenExtras(req.user, (err, extras) => {
      if (err) return next(err);

      extras = extras || {};
      extras.realm = this.name;

      let expiresIn = nconf.get('tokenExpiresIn');
      let revokeTokenDoc = new RevokeToken({});
      jwt.sign(extras, secret, { subject, expiresIn, jwtid: revokeTokenDoc._id.toString() }, (err, token) => {
        if (err) return next(err);
        else {
          revokeTokenDoc.save(err => {
            if (err) next(err);
            else {
              res.json({ token });
            }
          });
        }
      });
    });
  }

  _signupRouter(req, res, next) {
    let model = this.getModelDataFromRequest(req.body);
    let password = this.getPasswordFromRequest(req.body);
    let Model = this.model;

    Model.register(new Model(model), password, (err) => {
      if (err) return next(err);
      res.json({ code: 200, msg: 'ok' });
    });
  }

  _isRevoked(req, res, next) {
    let RevokeToken = mongoose.model('RevokeToken');
    let headers = req.headers;
    co(function* () {
      let authorization = "";
      if (!(headers.authorization && headers.authorization.split(' ')[0] === 'Bearer')) {
        reject({ code: 500, msg: "Not a valid token." });
      } else {
        authorization = headers.authorization.split(' ')[1];
      }
      let decode = yield new Promise((resolve, reject) => {
        jwt.verify(authorization, nconf.get('secret'), (err, decode) => {
          if (err) {
            reject({ code: 500, msg: "Not a valid token." });
          } else {
            resolve(decode);
          }
        });
      });
      let jti = decode.jti;
      if (yield _isRevokedJwtId(jti)) {
        next();
      }
    }).catch(err => {
      console.log("Error: " + JSON.stringify(err));
      res.json(err);
    });
  }

  _isRevokedJwtId(jti) {
    let RevokeToken = mongoose.model('RevokeToken');
    if (!!!jti) {
      return Promise.reject({ code: 500, msg: "Args jti is required." });
    } else {
      return new Promise((resolve, reject) => {
        RevokeToken.findById(jti, (err, doc) => {
          if (err || !!!doc || !doc.active) {
            reject({ code: 500, msg: "Not a valid token." })
          } else {
            resolve(true);
          }
        });
      });
    }
  }

  _expressJwtRevoked(req, payload, done) {
    let jti = payload.jti;
    let RevokeToken = mongoose.model('RevokeToken');
    if (!!!jti) {
      return done({ code: 500, msg: "Args jti is required." });
    } else {
      RevokeToken.findById(jti, (err, doc) => {
        if (err || !!!doc || !doc.active) {
          return done({ code: 500, msg: "Not a valid token." });
        } else {
          console.log(payload);
          return done(null, !!!doc);
        }
      });
    }
  }

  _revokeToken(jti) {
    let RevokeToken = mongoose.model('RevokeToken');
    if (!!!jti) {
      return Promise.reject({ code: 500, msg: "Args jti is required." });
    } else {
      return new Promise((resolve, reject) => {
        RevokeToken.findById(jti, (err, doc) => {
          if (err || !!!doc) {
            reject({ code: 500, msg: "No such a token id." })
          } else {
            doc.active = false;
            doc.save(err => {
              if (err) {
                reject({ code: 500, msg: "Error: " + JSON.stringify(err) });
              } else {
                resolve(true);
              }
            });
          }
        });
      });
    }
  }

  _errorHandler(err, req, res, next) {
    if (err && err.code !== 200) {
      console.log(err);
      res.json(err);
    } else {
      res.json({ code: 200, msg: "OK" });
    }
  }

  /**
   * createTokenExtras
   */

  /**
   * getModelDataFromRequest
   */

  /**
   * getPasswordFromRequest
   */
  getPasswordFromRequest(body) {
    return body.password
  }

}
