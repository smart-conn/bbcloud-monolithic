'use strict';

const AuthService = require('./base/auth-service');
const mongoose = require('mongoose');
const passport = require('passport');

module.exports = class AdministratorService extends AuthService {

  constructor() {
    super();
    this.name = 'administrator';
    this.model = mongoose.model('AdministratorAccount');
  }

  createTokenExtras(user, done) {
    this.model.findById(user.id).populate({
      path: 'role',
      populate: {path: 'permissions', select: 'code'}
    }).then(function(admin) {
      var scope = admin.role.permissions.map(function(permission) {
        return permission.code;
      }).join(',');
      done(null, {scope});
    }).catch(done);
  }

  getModelDataFromRequest(body) {
    let name = body.name;
    return { name };
  }

  changePwd() {
    let router = require('express').Router();
    router.post('/auth/administrator/changePwd', (req, res) => {
      let id = req.body.id;
      let password = req.body.password;

      if (!id || !password) {
        res.json({ code: 500, msg: 'Can not change password due to wrong args.' });
      } else {
        this.model.findById(id, (err, doc) => {
          if (err) {
            res.json({ code: 500, msg: 'Can not change password due to wrong id.' });
          } else {
            doc.setPassword(password, (err, admin) => {
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

    router.post('/auth/administrator/changeOwnPwd', passport.authenticate('jwt', { session: false }), (req, res) => {
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
