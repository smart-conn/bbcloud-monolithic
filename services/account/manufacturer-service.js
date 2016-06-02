'use strict';

<<<<<<< HEAD
const AuthService = require('./base/auth-service');
const mongoose = require('mongoose');
const passport = require('passport');
=======
var AuthService = require('./base/auth-service');
var mongoose = require('mongoose');
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70

module.exports = class ManufacturerService extends AuthService {

  constructor() {
    super();
    this.name = 'manufacturer';
    this.model = mongoose.model('ManufacturerAccount');
  }

  createTokenExtras(user, done) {
<<<<<<< HEAD
    this.model.findById(user.id).then(function(manufacturerAccount) {
      var manufacturer = manufacturerAccount.manufacturer.toString();
      done(null, {manufacturer});
    }).catch(done);
=======
    done();
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
  }

  getModelDataFromRequest(body) {
    var email = body.email;
<<<<<<< HEAD
    return { email };
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
=======
    return {email};
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
  }

}
