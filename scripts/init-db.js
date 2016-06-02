#!/usr/bin/env node

require('../nconf');
require('../mongoose');

var mongoose = require('mongoose');
var Promise = require('bluebird');

var AdministratorAccount = mongoose.model('AdministratorAccount');
var Permission = mongoose.model('Permission');
var Role = mongoose.model('Role');

var administratorName = 'admin';
var password = 'admin';

var roleName = '超级管理员';

var permissions = [
<<<<<<< HEAD
  {name: '查询权限列表', code: 'permissions:read'},
  {name: '删除权限', code: 'permissions:delete'},
  {name: '新建权限', code: 'permissions:create'},
  {name: '修改权限', code: 'permissions:update'},

  {name: '查询角色列表', code: 'roles:read'},
  {name: '删除角色', code: 'roles:delete'},
  {name: '新建角色', code: 'roles:create'},
  {name: '修改角色', code: 'roles:update'},

  {name: '查询管理员列表', code: 'administrator-accounts:read'},
  {name: '删除管理员', code: 'administrator-accounts:delete'},
  {name: '新建管理员', code: 'administrator-accounts:create'},
  {name: '修改管理员', code: 'administrator-accounts:update'},

  {name: '查询消费者列表', code: 'customer-accounts:create'},
  {name: '删除消费者', code: 'customer-accounts:delete'},
];

Promise.all(mongoose.modelNames().map(function(modelName) {
  return mongoose.model(modelName).remove();
})).then(function() {
  console.log('clean done');
  return Promise.all([
    AdministratorAccount.register(new AdministratorAccount({name: administratorName}), password),
    new Role({name: roleName}).save(),
    Promise.all(permissions.map(function(permissionData) {
      return new Permission(permissionData).save();
    }))
  ]).spread(function(administrator, role, permissions) {
    administrator.role = role;
    role.permissions = permissions;
    return Promise.all([
      administrator.save(),
      role.save()
    ]);
  })
}).then(function() {
  console.log('init done');
=======
  {name: '查询权限列表', code: 'permission:list'},
  {name: '删除权限', code: 'permission:remove'},
  {name: '新建权限', code: 'permission:create'},
  {name: '修改权限', code: 'permission:update'},

  {name: '查询角色列表', code: 'role:list'},
  {name: '删除角色', code: 'role:remove'},
  {name: '新建角色', code: 'role:create'},
  {name: '修改角色', code: 'role:update'},

  {name: '查询管理员列表', code: 'administrator-account:list'},
  {name: '删除管理员', code: 'administrator-account:remove'},
  {name: '新建管理员', code: 'administrator-account:create'},
  {name: '修改管理员', code: 'administrator-account:update'},

  {name: '查询消费者列表', code: 'customer-account:create'},
  {name: '删除消费者', code: 'customer-account:remove'},
];

Promise.all([
  AdministratorAccount.register(new AdministratorAccount({name: administratorName}), password),
  new Role({name: roleName}).save(),
  Promise.all(permissions.map(function(permissionData) {
    return new Permission(permissionData).save();
  }))
]).spread(function(administrator, role, permissions) {
  administrator.role = role;
  role.permissions = permissions;
  return Promise.all([
    administrator.save(),
    role.save()
  ]);
}).then(function() {
  console.log('done');
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
});
