'use strict';
const mongoose = require('mongoose');
const _ = require('lodash');

mongoose.connect('mongodb://127.0.0.1/', err => {
  const AdminAccount = require('./models/administrator-account');
  const Permission = require('./models/permission');
  const Role = require('./models/role');

  const models = mongoose.models;

  let adminAccount = new AdminAccount({ name: "tosone" });
  let adminAccountPwd = "tosone";

  let role = new Role({ name: "adminRole" });

  let permission = new Permission({ name: "administratorPermission" });

  adminAccount.role = role._id;
  role.adminAccounts.push(adminAccount._id);
  role.permissions.push(permission._id);
  permission.roles.push(role._id);

  Promise.all([
    _.each(models, (model) => {
      return new Promise((resolve, reject) => {
        model.remove(err => {
          if (!err) resolve(true);
        })
      });
    })
  ]).then((data) => {
    return Promise.all([
      new Promise((resolve, reject) => {
        AdminAccount.register(adminAccount, adminAccountPwd, err => {
          resolve(true);
        });
      }),

      permission.save(),

      role.save()
    ]);
  }).then(() => {
    console.log("succ");
    process.exit(0);
  }).catch((err) => {
    console.log(err);
    process.exit(err);
  });

});
