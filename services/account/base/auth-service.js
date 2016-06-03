'use strict';
const jwt = require('jsonwebtoken');
const nconf = require('nconf');

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

    let subject = req.user.id;
    this.createTokenExtras(req.user, (err, extras) => {
      if (err) return next(err);

      extras = extras || {};
      extras.realm = this.name;

      let expiresIn = nconf.get('tokenExpiresIn');
      jwt.sign(extras, secret, { subject, expiresIn }, (err, token) => {
        if (err) return next(err);
        res.json({ token });
      });
    });
  }

  _signupRouter(req, res, next) {
    console.log(req.body);
    let model = this.getModelDataFromRequest(req.body);
    let password = this.getPasswordFromRequest(req.body);
    let Model = this.model;

    Model.register(new Model(model), password, (err) => {
      if (err) return next(err);
      res.json({ msg: 'ok' });
    });
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
