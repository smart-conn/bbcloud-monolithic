'use strict';

var AuthService = require('./base/auth-service');
var mongoose = require('mongoose');

module.exports = class AdministratorService extends AuthService {

  constructor() {
    super();
    this.name = 'administrator';
    this.model = mongoose.model('AdministratorAccount');
  }

  createTokenExtras(user, done) {
    done();
  }

  getModelDataFromRequest(body) {
    var name = body.name;
    return {name};
  }

}
