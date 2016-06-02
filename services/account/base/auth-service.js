'use strict';

var jwt = require('jsonwebtoken');

module.exports = class AuthService {

  createMiddleware() {
    var router = require('express').Router();
    var passport = require('passport');
<<<<<<< HEAD
=======
    console.log(this.name);
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
    router.post(`/${this.name}/auth/signup`, this._signupRouter.bind(this));
    router.post(`/${this.name}/auth/login`, passport.authenticate(this.name, { session: false }), this._issueTokenRouter.bind(this));
    return router;
  }

  _issueTokenRouter(req, res, next) {
    var nconf = require('nconf');
    var secret = nconf.get('secret');

    var subject = req.user.id;
    this.createTokenExtras(req.user, (err, extras) => {
      if (err) return next(err);

      extras = extras || {};
      extras.realm = this.name;

<<<<<<< HEAD
      jwt.sign(extras, secret, { subject }, function (err, token) {
=======
      jwt.sign(extras, secret, { subject }, function(err, token) {
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
        if (err) return next(err);
        res.json({ token });
      });
    });
  }

  _signupRouter(req, res, next) {
    var model = this.getModelDataFromRequest(req.body);
    var password = this.getPasswordFromRequest(req.body);
    var Model = this.model;

<<<<<<< HEAD
    Model.register(new Model(model), password, function (err) {
=======
    Model.register(new Model(model), password, function(err) {
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
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
