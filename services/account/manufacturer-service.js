'use strict';

var AuthService = require('./base/auth-service');
var mongoose = require('mongoose');

module.exports = class ManufacturerService extends AuthService {

  constructor() {
    super();
    this.name = 'manufacturer';
    this.model = mongoose.model('ManufacturerAccount');
  }

  createTokenExtras(user, done) {
    done();
  }

  getModelDataFromRequest(body) {
    var email = body.email;
    return {email};
  }

}
