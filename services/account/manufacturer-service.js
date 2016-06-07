'use strict';

const AuthService = require('./base/auth-service');
const mongoose = require('mongoose');
const passport = require('passport');

module.exports = class ManufacturerService extends AuthService {

  constructor() {
    super();
    this.name = 'manufacturer';
    this.manufacturerModel = mongoose.model('Manufacturer');
    this.model = mongoose.model('ManufacturerAccount');
  }

  createTokenExtras(user, done) {
    this.model.findById(user.id).then(function(manufacturerAccount) {
      var manufacturer;
      try {manufacturer = manufacturerAccount.manufacturer.toString()} catch(err) {}
      done(null, {manufacturer});
    }).catch(done);
  }

  getModelDataFromRequest(body) {
    var email = body.email;
    return { email };
  }

  auth() {
    let router = require('express').Router();
    router.post('/auth/manufacturer/auth', passport.authenticate('jwt', { session: false }), (req, res) => {
      let id = req.user.sub;
      console.log('body:',req.body);
      var entity = new this.manufacturerModel(req.body);
      var accountModel = this.model;
      entity.save().then(function(){
        //update account
        accountModel.findByIdAndUpdate(id,{manufacturer:entity._id}).then(function (account) {
          if (!account) throw new Error('not fount');
          var o = account.toObject();
          o.id = o._id.toString();
          delete o._id;
          res.json(o)
        }).catch(function(e){
          console.log('update account error :',e);
        });
      }).catch(function(e){
        console.log(e);
        res.json({code:500,msg:'save error'})
      })
    })
    return router;
  }

  changePwd() {
    let router = require('express').Router();
    router.post('/auth/manufacturer/changeOwnPwd', passport.authenticate('jwt', { session: false }), (req, res) => {
      let id = req.user.sub;
      let oldPassword = req.body.oldPassword;
      let newPassword = req.body.newPassword;

      if (!id || !oldPassword || !newPassword) {
        res.json({ code: 500, msg: 'Can not change password due to wrong args.' });
      } else {
        this.model.findById(id, (err, doc) => {
          if (err) {
            res.json({ code: 500, msg: 'Can not change password due to wrong id.' });
          } else {
            doc.authenticate(oldPassword, (err, admin) => {
              if (err || !admin) {
                res.json({ code: 500, msg: 'Can not change password due to wrong password.' });
              } else {
                admin.setPassword(newPassword, (err, admin) => {
                  if (err) {
                    res.json({ code: 500, msg: 'Can not change password due to password hash with salt error.' });
                  } else {
                    admin.save(err => {
                      if (err) {
                        res.json({ code: 500, msg: 'Can not change password due to mongodb save error.' });
                      } else {
                        res.json({ code: 200 });
                      };
                    });
                  };
                });
              };
            });
          };
        });
      };
    });

    return router;
  }

}
