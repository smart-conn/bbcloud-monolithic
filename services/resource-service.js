'use strict';
const mongoose = require('mongoose');
const RevokeToken = mongoose.model("RevokeToken");

function mongoIdToWebId(entity) {
  var o = entity.toObject();
  o.id = o._id.toString();
  delete o._id;
  return o;
}

function checkScope(scope, permission) {
  scope = scope || [];
  return scope.indexOf(permission) === -1;
}

// 吊销Token，设计到管理员的一些操作PUT和DELETE
function revokeToken(id) {
  return RevokeToken.update({
    uid: id,
    active: true
  }, {
    active: false
  }, {
    multi: true
  }, (err, doc) => {
    if (err) {
      return {
        code: 500,
        msg: err
      };
    } else {
      console.log(doc);
      return {
        code: 200
      };
    }
  });
}

module.exports = function(resource, model) {
  const router = require('express').Router();
  const Model = mongoose.model(model);

  router.route('/' + resource)
    .get(function(req, res, next) {

      if (req.user.realm === 'administrator') {
        console.log(req.scope);
        if (checkScope(req.scope, resource + ':read')) {
          return res.sendStatus(403);
        }
      }

      var page = req.query._page;
      var perPage = req.query._perPage;
      var sortField = req.query._sortField;
      var sortDir = req.query._sortDir;
      var filters = req.query._filters;

      var skip = parseInt((page - 1) * perPage);
      var limit = parseInt(perPage);
      var sort = {};
      try {
        sort[sortField] = sortDir.toLowerCase()
      } catch (err) {}
      try {
        filters = JSON.parse(req.query._filters)
      } catch (err) {}

      Promise.all([
        Model.count(filters),
        Model.find(filters).limit(limit).skip(skip).sort(sort)
      ]).then(function(result) {
        res.header('X-Total-Count', result[0]);
        res.json(result[1].map(mongoIdToWebId));
      }).catch(next);
    })
    .post(function(req, res, next) {

      if (req.user.realm === 'administrator') {
        if (checkScope(req.scope, resource + ':create')) {
          return res.sendStatus(403);
        }
      }

      var data = req.body;

      var entity = new Model(data);
      entity.save().then(function() {
        res.json(mongoIdToWebId(entity));
      }).catch(next);
    });

  router.route('/' + resource + '/:id')
    .get(function(req, res, next) {

      if (req.user.realm === 'administrator') {
        if (checkScope(req.scope, resource + ':read')) {
          return res.sendStatus(403);
        }
      }

      var id = req.params.id;

      Model.findById(id).then(function(entity) {
        if (!entity) throw new Error('not fount');
        res.json(mongoIdToWebId(entity));
      }).catch(next);
    })
    .put(function(req, res, next) {
      var id = req.params.id;
      var data = req.body;

      if (req.user.realm === 'administrator') {
        if (checkScope(req.scope, resource + ':update')) {
          return res.sendStatus(403);
        } else {
          revokeToken(id);
        }
      }

      Model.findByIdAndUpdate(id, data).then(function(entity) {
        if (!entity) throw new Error('not fount');
        res.json(mongoIdToWebId(entity));
      }).catch(next);
    })
    .delete(function(req, res, next) {

      if (req.user.realm === 'administrator') {
        if (checkScope(req.scope, resource + ':delete')) {
          return res.sendStatus(403);
        } else {
          revokeToken(id);
        }
      }

      var id = req.params.id;

      Model.findByIdAndRemove(id).then(function(entity) {
        if (!entity) throw new Error('not fount');
        res.json(mongoIdToWebId(entity));
      }).catch(next);
    });

  return router;
};