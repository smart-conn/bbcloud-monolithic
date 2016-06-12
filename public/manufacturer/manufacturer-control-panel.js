var LOGIN_STATE_NAME = 'login';
var LOGOUT_STATE_NAME = 'logout';
var SIGNUP_STATE_NAME = 'signup';
var RESETPWD_STATE_NAME = 'resetpwd';
var SETPWD_STATE_NAME = 'setPwd';

var LOGIN_REDIRECT_TO = '/dashboard';
var LOGOUT_REDIRECT_TO = '/login';

var adminApp = angular.module('adminControlPanel', [
<<<<<<< HEAD
    'ng-admin',
    'satellizer'
  ]).config(manufacturerControlPanelConfig)
=======
  'ng-admin',
  'satellizer'
]).config(manufacturerControlPanelConfig)
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
  .config(routeConfig)
  .config(authConfig)
  .run(anonymousRedirect)
  .controller('AuthController', AuthController)
  .controller('ManufacturerController', ManufacturerController)
  .controller('ChangeOwnPwdController', ChangeOwnPwdController)
  .controller('ResetPwdController', ResetPwdController)
  .controller('SetPwdController', SetPwdController)
<<<<<<< HEAD
  .controller('UserMenu', function($scope, $auth, $http) {
=======
  .controller('UserMenu', function ($scope, $auth, $http) {
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
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
<<<<<<< HEAD

  batchConfig(nga, admin);
  modelConfig(nga, admin);
=======
  admin.addEntity(nga.entity('manufacturers'));

  batchConfig(nga, admin);
  modelConfig(nga, admin);
  manufacturersAuthConfig(nga, admin);
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618

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
<<<<<<< HEAD
=======
  })
  .state("auth", {
    url: '/auth-manufacturer',
    templateUrl: 'views/auth-manufacturer.html',
    controller: 'ManufacturerController',
    controllerAs: 'manufacturerCtrl'
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
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
<<<<<<< HEAD
    controller: function($auth, $location) {
=======
    controller: function ($auth, $location) {
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
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
<<<<<<< HEAD
  $rootScope.$on('$stateChangeStart', function(evt, toState) {
=======
  $rootScope.$on('$stateChangeStart', function (evt, toState) {
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
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

<<<<<<< HEAD
  this.login = function(credentials) {
    $auth.setStorageType('sessionStorage');
    $auth.login(credentials)
      .then(function() {
        $location.path(loginRedirectTo);
      }).catch(function(data) {
        notification.log("Wrong Password.", {
          addnCls: 'humane-flatty-error'
        });
      });
  };

  this.signup = function(credentials) {
    $auth.signup(credentials)
      .then(function() {
        return $auth.login(credentials);
      })
      .then(function() {
=======
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
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
        $location.path(loginRedirectTo);
      });
  };
}

function ManufacturerController($http, $auth, $location) {

  var self = this;

<<<<<<< HEAD
  $http.get('/api/manufacturers').success(function(result) {
    self.manufacturers = result;
  });

  this.select = function(id) {
    $http.get('/manufacturer/' + id + '/select').success(function(result) {
      $auth.setToken(result.token);
      $location.path(LOGIN_REDIRECT_TO);
    }).error(function() {
=======
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
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
      alert('失败');
    });
  };

<<<<<<< HEAD
  this.createNewManufacturer = function(entity) {
    $http.post('/api/manufacturers', entity).success(function() {
      alert('成功');
    }).error(function() {
=======
  this.authManufacturer = function (entity) {
    $http.post('/auth/manufacturer/auth', entity).success(function () {
      alert('成功');
    }).error(function () {
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
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
<<<<<<< HEAD
  this.changepwd = function(pwd) {
    if (pwd.newPassword == "") {
      notification.log("Password can not be blank.", {
        addnCls: 'humane-flatty-error'
      });
    } else if (pwd.newPassword != pwd.confirmPassport) {
      notification.log("The pin code must be the same.", {
        addnCls: 'humane-flatty-error'
      });
=======
  this.changepwd = function (pwd) {
    if (pwd.newPassword == "") {
      notification.log("Password can not be blank.", { addnCls: 'humane-flatty-error' });
    } else if (pwd.newPassword != pwd.confirmPassport) {
      notification.log("The pin code must be the same.", { addnCls: 'humane-flatty-error' });
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
    } else {
      $http.post("/auth/manufacturer/changeOwnPwd", {
        oldPassword: pwd.oldPassword,
        newPassword: pwd.newPassword
      }).success((reply) => {
        if (reply.code == 200) {
<<<<<<< HEAD
          notification.log("Password has been changed.", {
            addnCls: 'humane-flatty-success'
          });
          $auth.logout();
          $location.path(signOutRedirectTo);
        } else {
          notification.log("Change Password error.", {
            addnCls: 'humane-flatty-error'
          });
=======
          notification.log("Password has been changed.", { addnCls: 'humane-flatty-success' });
          $auth.logout();
          $location.path(signOutRedirectTo);
        } else {
          notification.log("Change Password error.", { addnCls: 'humane-flatty-error' });
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
        }
      });
    }
  }
}

function ResetPwdController($scope, $http, notification) {
<<<<<<< HEAD
  this.resetPwd = function(email) {
    $http.post('/auth/manufacturer/resetPwd', {
      email
    }).success((data) => {
      if (data.code == 200) {
        notification.log('We have send a email to your email, please check your email.', {
          addnCls: 'humane-flatty-success'
        });
      } else {
        notification.log(data.msg, {
          addnCls: 'humane-flatty-error'
        });
=======
  this.resetPwd = function (email) {
    $http.post('/auth/manufacturer/resetPwd', { email }).success((data) => {
      if (data.code == 200) {
        notification.log('We have send a email to your email, please check your email.', { addnCls: 'humane-flatty-success' });
      } else {
        notification.log(data.msg, { addnCls: 'humane-flatty-error' });
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
      }
      console.log(data);
    }).error(console.log);
  }
}

function SetPwdController($scope, $http, notification, $location) {
<<<<<<< HEAD
  this.changepwd = function(credentials) {
    var token = $location.search().token;
    if (credentials.password != credentials.confirm) {
      notification.log("The pin code must be the same.", {
        addnCls: 'humane-flatty-error'
      });
    } else {
      $http.post('/auth/manufacturer/setPwd', {
        token,
        password: credentials.password
      }).success(function(data) {
=======
  this.changepwd = function (credentials) {
    var token = $location.search().token;
    if (credentials.password != credentials.confirm) {
      notification.log("The pin code must be the same.", { addnCls: 'humane-flatty-error' });
    } else {
      $http.post('/auth/manufacturer/setPwd', {
        token, password: credentials.password
      }).success(function (data) {
>>>>>>> eb7d4840902ff9920913fa562f8cca4b1a759618
        console.log(data);
      });
    }
  }
}