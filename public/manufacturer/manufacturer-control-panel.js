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
  .controller('ManufacturerController', ManufacturerController);

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

function ManufacturerController($http, $auth, $location) {

  var self = this;

  $http.get('/api/manufacturers').success(function(result) {
    self.manufacturers = result;
  });

  this.select = function(id) {
    $http.get('/manufacturer/' + id + '/select').success(function(result) {
      $auth.setToken(result.token);
      $location.path(LOGIN_REDIRECT_TO);
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
