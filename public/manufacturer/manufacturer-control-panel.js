var LOGIN_STATE_NAME = 'login';
var LOGOUT_STATE_NAME = 'logout';
var SIGNUP_STATE_NAME = 'signup';

var LOGIN_REDIRECT_TO = '/dashboard';
var LOGOUT_REDIRECT_TO = '/login';

var adminApp = angular.module('adminControlPanel', [
  'ng-admin',
  'satellizer'
]).config(manufacturerControlPanelConfig)
  .config(routeConfig)
  .config(authConfig)
  .run(anonymousRedirect)
  .controller('AuthController', AuthController)
  .controller('ChangeOwnPwdController', ChangeOwnPwdController)
  .controller('ManufacturerController', ManufacturerController);

function manufacturerControlPanelConfig(NgAdminConfigurationProvider) {

  var nga = NgAdminConfigurationProvider;
  var admin = nga.application('我是厂商')
    .baseApiUrl('http://127.0.0.1:3000/api/');

  admin.addEntity(nga.entity('batches'));
  admin.addEntity(nga.entity('models'));

  batchConfig(nga, admin);
  modelConfig(nga, admin);

  admin.menu(menuConfig(nga, admin));
  admin.header(headerConfig());
  admin.dashboard(nga.dashboard());

  nga.configure(admin);
}

function authConfig($authProvider) {
  $authProvider.tokenPrefix = 'manufacturer';
  $authProvider.baseUrl = '/manufacturer/';
}

function routeConfig($stateProvider) {
  var loginStateName = LOGIN_STATE_NAME;
  var logoutStateName = LOGOUT_STATE_NAME;
  var logoutRedirectTo = LOGOUT_REDIRECT_TO;
  var signupStateName = SIGNUP_STATE_NAME;

  $stateProvider.state("changePwd", {
    url: '/change-password',
    templateUrl: 'views/change-password.html'
  });

  $stateProvider.state(loginStateName, {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'AuthController',
    controllerAs: 'authCtrl'
  });

  $stateProvider.state(signupStateName, {
    url: '/signup',
    templateUrl: 'views/signup.html',
    controller: 'AuthController',
    controllerAs: 'authCtrl'
  });

  $stateProvider.state(logoutStateName, {
    url: '/logout',
    controller: function($auth, $location) {
      $auth.logout();
      $location.path(logoutRedirectTo);
    }
  });

  $stateProvider.state('select-manufacturer', {
    url: '/select',
    templateUrl: 'views/select-manufacturer.html',
    controller: 'ManufacturerController',
    controllerAs: 'manufacturerCtrl'
  });
}

function anonymousRedirect($rootScope, $state, $auth) {
  var loginStateName = LOGIN_STATE_NAME;
  var logoutStateName = LOGOUT_STATE_NAME;
  var signupStateName = SIGNUP_STATE_NAME;
  $rootScope.$on('$stateChangeStart', function(evt, toState) {
    if (!$auth.isAuthenticated()) {
      if (toState.name === loginStateName) return;
      if (toState.name === logoutStateName) return;
      if (toState.name === signupStateName) return;

      console.log('not login, redirect to signin');
      evt.preventDefault();
      return $state.go(loginStateName);
    }
  });
}

function AuthController($auth, $location) {
  var loginRedirectTo = LOGIN_REDIRECT_TO;

  this.login = function(credentials) {
    $auth.login(credentials)
      .then(function() {
        $location.path(loginRedirectTo);
      });
  };

  this.signup = function(credentials) {
    $auth.signup(credentials)
      .then(function() {
        return $auth.login(credentials);
      })
      .then(function() {
        $location.path(loginRedirectTo);
      });
  };
}

function ManufacturerController($http, $auth) {

  var self = this;

  $http.get('/api/manufacturers').success(function(result) {
    self.manufacturers = result;
  });

  this.select = function(id) {
    $http.get('/manufacturer/' + id + '/select').success(function(result) {
      $auth.setToken(result.token);
    }).error(function() {
      alert('失败');
    });
  };

  this.createNewManufacturer = function(entity) {
    $http.post('/api/manufacturers', entity).success(function() {
      alert('成功');
    }).error(function() {
      alert('失败');
    });
  };

}

function ChangeOwnPwdController($scope, $http, notification, $auth, $location) {
  $scope.password = {
    password: "",
    confirm: ""
  };
  var signOutRedirectTo = LOGOUT_REDIRECT_TO;
  this.changepwd = function(pwd) {
    if (pwd.password == "") {
      notification.log("Password can not be blank.", { addnCls: 'humane-flatty-error' });
    } else if (pwd.password != pwd.confirm) {
      notification.log("The pin code must be the same.", { addnCls: 'humane-flatty-error' });
    } else {
      $http.post("http://127.0.0.1:3001/auth/administrator/changeOwnPwd", {
        password: pwd.password
      }).success((reply) => {
        if (reply.code == 200) {
          notification.log("Password has been changed.", { addnCls: 'humane-flatty-success' });
          $auth.logout();
          $location.path(signOutRedirectTo);
        } else {
          notification.log("Change Password error.", { addnCls: 'humane-flatty-error' });
        }
      });
    }
  }
}

adminApp.directive('changePwd', function(Restangular, $state, notification, $http) {
  return {
    restrict: 'E',
    scope: true,
    link: function(scope, element, attrs) {
      scope.changePWD = () => {
        $(".modal", element).modal('show');
        scope.password = "";
        scope.confirm = "";
        scope.id = JSON.parse(attrs.administrator).id;
      }
      scope.changePWDBtn = function() {
        $(".modal", element).modal('hide');
        if (scope.password == scope.confirm) {
          $http.post("http://127.0.0.1:3001/auth/administrator/changepwd", {
            password: scope.password,
            id: scope.id
          }).success(function(data) {
            if (data.code == 200) {
              notification.log("Password Change Success.", { addnCls: 'humane-flatty-success' })
            } else {
              notification.log("Password Change Error.", { addnCls: 'humane-flatty-error' })
            }
          });
        } else {
          notification.log("Password Change Error.", { addnCls: 'humane-flatty-error' })
        }
      }
    },
    template: `<button class="btn btn-default btn-xs" ng-click="changePWD()"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>ChangePWD</button>
      <div class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title">
                Change Password
              </div>
            </div>
            <div class="modal-body">
              <form class="form">
                <div class="form-group">
                  <label class="">Password</label>
                  <input type="password" class="form-control" ng-model="password" placeholder="Password">
                </div>
                <div class="form-group">
                  <label>Confirm Password</label>
                  <input type="password" class="form-control" ng-model="confirm" placeholder="Confirm Password">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" ng-click="changePWDBtn()">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    `
  }
});
