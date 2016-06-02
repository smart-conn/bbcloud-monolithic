'use strict';

var AuthService = require('./base/auth-service');
var mongoose = require('mongoose');

module.exports = class CustomerService extends AuthService {

  constructor() {
    super();
    this.name = 'customer';
    this.model = mongoose.model('CustomerAccount');
  }

  createTokenExtras(user, done) {
    done();
  }

  getModelDataFromRequest(body) {
    var mobilePhoneNumber = body.mobilePhoneNumber;
    return {mobilePhoneNumber};
  }

}
