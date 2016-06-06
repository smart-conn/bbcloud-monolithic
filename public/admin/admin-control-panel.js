var LOGIN_STATE_NAME = 'signIn';
var LOGOUT_STATE_NAME = 'signOut';

var LOGIN_REDIRECT_TO = '/dashboard';
var LOGOUT_REDIRECT_TO = '/sign-in';

var adminApp = angular.module('adminControlPanel', [
  'ng-admin',
  'satellizer'
])
  .config(adminControlPanelConfig)
  .config(authConfig)
  .config(routeConfig)
  .run(anonymousRedirect)
  .run(permissionDenyRedirect)
  .controller('SignInController', SignInController)
  .controller('ChangeOwnPwdController', ChangeOwnPwdController)
  .controller('UserMenu', function ($scope, $auth, $http) {
    $http.get("/api/administrator-accounts/" + $auth.getPayload().sub).success(data => {
      this.name = data.name;
    }).catch(data => {
      this.name = "未知用户";
    });
  });


function adminControlPanelConfig(NgAdminConfigurationProvider) {

  var nga = NgAdminConfigurationProvider;
  var admin = nga.application('BBCloud 后台管理')
    .baseApiUrl('http://127.0.0.1:3000/api/');

  admin.addEntity(nga.entity('administrator-accounts'));
  admin.addEntity(nga.entity('customer-accounts'));

  admin.addEntity(nga.entity('roles'));
  admin.addEntity(nga.entity('permissions'));

  admin.addEntity(nga.entity('manufacturers'));
  admin.addEntity(nga.entity('batches'));
  admin.addEntity(nga.entity('models'));

  administratorAccountConfig(nga, admin);
  customerAccountConfig(nga, admin);

  roleConfig(nga, admin);
  permissionConfig(nga, admin);

  manufacturerConfig(nga, admin);
  batchConfig(nga, admin);

  admin.menu(menuConfig(nga, admin));
  admin.header(headerConfig());
  admin.dashboard(nga.dashboard());

  nga.configure(admin);
}

function authConfig($authProvider) {
  $authProvider.tokenPrefix = 'administrator';
  $authProvider.baseUrl = '/administrator/';
}

function routeConfig($stateProvider) {
  var loginStateName = LOGIN_STATE_NAME;
  var logoutStateName = LOGOUT_STATE_NAME;
  var logoutRedirectTo = LOGOUT_REDIRECT_TO;

  $stateProvider.state("changePwd", {
    url: '/change-password',
    templateUrl: 'views/change-password.html'
  });

  $stateProvider.state('403', {
    parent: 'main',
    url: '/forbidden',
    templateUrl: 'views/403.html'
  });

  $stateProvider.state(loginStateName, {
    url: '/sign-in',
    templateUrl: 'views/sign-in.html',
    controller: 'SignInController',
    controllerAs: 'signInCtrl'
  });

  $stateProvider.state(logoutStateName, {
    url: '/sign-out',
    controller: function ($auth, $location) {
      $auth.logout();
      $location.path(logoutRedirectTo);
    }
  });
}

function anonymousRedirect($rootScope, $state, $auth) {
  var signInStateName = LOGIN_STATE_NAME;
  var signOutStateName = LOGOUT_STATE_NAME;
  $rootScope.$on('$stateChangeStart', function (evt, toState) {
    if (!$auth.isAuthenticated()) {
      if (toState.name === signInStateName) return;
      if (toState.name === signOutStateName) return;
      console.log('not login, redirect to signin');
      evt.preventDefault();
      return $state.go(signInStateName);
    }
  });
}

function permissionDenyRedirect(Restangular, $state) {
  Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
    if (response.status === 403) {
      $state.go('403');
      return false; // error handled
    }
    return true; // error not handled
  });
}

function SignInController($auth, $location, notification) {
  var signInRedirectTo = LOGIN_REDIRECT_TO;
  this.signIn = function (credentials) {
    $auth.login(credentials)
      .then(function () {
        $location.path(signInRedirectTo);
      }).catch(function (data) {
        notification.log("Wrong Password.", { addnCls: 'humane-flatty-error' });
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
      $http.post("/auth/administrator/changeOwnPwd", {
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

adminApp.directive('changePwd', function (Restangular, $state, notification, $http) {
  return {
    restrict: 'E',
    scope: true,
    link: function (scope, element, attrs) {
      scope.changePWD = () => {
        $(".modal", element).modal('show');
        scope.password = "";
        scope.confirm = "";
        scope.id = JSON.parse(attrs.administrator).id;
        console.log(attrs.administrator);
      }
      scope.changePWDBtn = function () {
        $(".modal", element).modal('hide');
        if (scope.password == scope.confirm) {
          $http.post("/auth/administrator/changePwd", {
            password: scope.password,
            id: scope.id
          }).success(function (data) {
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
