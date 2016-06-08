var LOGIN_STATE_NAME = 'login';
var LOGOUT_STATE_NAME = 'logout';
var SIGNUP_STATE_NAME = 'signup';
var RESETPWD_STATE_NAME = 'resetpwd';
var SETPWD_STATE_NAME = 'setPwd';

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
  .controller('ManufacturerController', ManufacturerController)
  .controller('ChangeOwnPwdController', ChangeOwnPwdController)
  .controller('ResetPwdController', ResetPwdController)
  .controller('SetPwdController', SetPwdController)
  .controller('UserMenu', function ($scope, $auth, $http) {
    $http.get("/api/manufacturer-accounts/" + $auth.getPayload().sub).success(data => {
      this.name = data.email;
    }).catch(data => {
      this.name = "未知用户";
    });
  });

function manufacturerControlPanelConfig(NgAdminConfigurationProvider) {

  var nga = NgAdminConfigurationProvider;
  var admin = nga.application('我是厂商').baseApiUrl('/api/');

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
  var resetPwdStateName = RESETPWD_STATE_NAME;
  var setPwdStateName = SETPWD_STATE_NAME;

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
    controller: function ($auth, $location) {
      $auth.logout();
      $location.path(logoutRedirectTo);
    }
  });

  $stateProvider.state(resetPwdStateName, {
    url: '/resetPwd',
    templateUrl: 'views/reset-password.html'
  });

  $stateProvider.state(setPwdStateName, {
    url: '/setPwd',
    templateUrl: 'views/set-password.html'
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
  var resetPwdStateName = RESETPWD_STATE_NAME;
  var setPwdStateName = SETPWD_STATE_NAME;
  $rootScope.$on('$stateChangeStart', function (evt, toState) {
    if (!$auth.isAuthenticated()) {
      if (toState.name === loginStateName) return;
      if (toState.name === logoutStateName) return;
      if (toState.name === signupStateName) return;
      if (toState.name === resetPwdStateName) return;
      if (toState.name === setPwdStateName) return;

      console.log('not login, redirect to signin');
      evt.preventDefault();
      return $state.go(loginStateName);
    }
  });
}

function AuthController($auth, $location, notification) {
  var loginRedirectTo = LOGIN_REDIRECT_TO;

  this.login = function (credentials) {
    $auth.login(credentials)
      .then(function () {
        $location.path(loginRedirectTo);
      }).catch(function (data) {
        notification.log("Wrong Password.", { addnCls: 'humane-flatty-error' });
      });
  };

  this.signup = function (credentials) {
    $auth.signup(credentials)
      .then(function () {
        return $auth.login(credentials);
      })
      .then(function () {
        $location.path(loginRedirectTo);
      });
  };
}

function ManufacturerController($http, $auth, $location) {

  var self = this;

  $http.get('/api/manufacturers').success(function (result) {
    self.manufacturers = result;
  });

  this.select = function (id) {
    $http.get('/manufacturer/' + id + '/select').success(function (result) {
      $auth.setToken(result.token);
      $location.path(LOGIN_REDIRECT_TO);
    }).error(function () {
      alert('失败');
    });
  };

  this.createNewManufacturer = function (entity) {
    $http.post('/api/manufacturers', entity).success(function () {
      alert('成功');
    }).error(function () {
      alert('失败');
    });
  };

}

function ChangeOwnPwdController($scope, $http, notification, $auth, $location) {
  $scope.password = {
    oldPassword: "",
    newPassword: "",
    confirmPassport: ""
  };
  var signOutRedirectTo = LOGOUT_REDIRECT_TO;
  this.changepwd = function (pwd) {
    if (pwd.newPassword == "") {
      notification.log("Password can not be blank.", { addnCls: 'humane-flatty-error' });
    } else if (pwd.newPassword != pwd.confirmPassport) {
      notification.log("The pin code must be the same.", { addnCls: 'humane-flatty-error' });
    } else {
      $http.post("/auth/manufacturer/changeOwnPwd", {
        oldPassword: pwd.oldPassword,
        newPassword: pwd.newPassword
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

function ResetPwdController($scope, $http, notification) {
  this.resetPwd = function (email) {
    $http.post('/auth/manufacturer/resetPwd', { email }).success((data) => {
      if (data.code == 200) {
        notification.log('We have send a email to your email, please check your email.', { addnCls: 'humane-flatty-success' });
      } else {
        notification.log(data.msg, { addnCls: 'humane-flatty-error' });
      }
      console.log(data);
    }).error(console.log);
  }
}

function SetPwdController($scope, $http, notification, $location) {
  this.changepwd = function (credentials) {
    var token = $location.search().token;
    if (credentials.password != credentials.confirm) {
      notification.log("The pin code must be the same.", { addnCls: 'humane-flatty-error' });
    } else {
      $http.post('/auth/manufacturer/setPwd', {
        token, password: credentials.password
      }).success(function (data) {
        console.log(data);
      });
    }
  }
}