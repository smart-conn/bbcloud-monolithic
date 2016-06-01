var SIGN_IN_STATE_NAME = 'signIn';
var SIGN_OUT_STATE_NAME = 'signOut';

var SIGN_IN_REDIRECT_TO = '/dashboard';
var SIGN_OUT_REDIRECT_TO = '/sign-in';

var adminApp = angular.module('adminControlPanel', [
    'ng-admin',
    'satellizer'
  ]).config(adminControlPanelConfig)
  .config(signInConfig)
  .run(anonymousRedirect)
  .controller('SignInController', SignInController)
  .controller('ChangeOwnPwdController', ChangeOwnPwdController)

function adminControlPanelConfig(NgAdminConfigurationProvider) {

  var nga = NgAdminConfigurationProvider;
  var admin = nga.application('BBCloud 后台管理')
    .baseApiUrl('http://127.0.0.1:3000/api/');

  admin.addEntity(nga.entity('administrators'));
  admin.addEntity(nga.entity('roles'));
  admin.addEntity(nga.entity('permissions'));
  admin.addEntity(nga.entity('manufacturers'));
  admin.addEntity(nga.entity('customers'));

  administratorConfig(nga, admin);
  roleConfig(nga, admin);
  permissionConfig(nga, admin);
  manufacturerConfig(nga, admin);
  customerConfig(nga, admin);

  admin.menu(menuConfig(nga, admin));
  admin.header(headerConfig());
  admin.dashboard(nga.dashboard());

  nga.configure(admin);
}

// function translationConfig($translateProvider) {
//   $translateProvider.translations('zh', {
//     Name: '名称'
//   });
//   $translateProvider.preferredLanguage('zh');
// }

function signInConfig($stateProvider, $authProvider) {
  var signInStateName = SIGN_IN_STATE_NAME;
  var signOutStateName = SIGN_OUT_STATE_NAME;
  var signOutRedirectTo = SIGN_OUT_REDIRECT_TO;

  $authProvider.tokenPrefix = 'administrator';
  $authProvider.baseUrl = '/administrator/';
  $stateProvider.state("changePwd", {
    url: '/change-password',
    templateUrl: 'views/change-password.html'
  });
  $stateProvider.state(signInStateName, {
    url: '/sign-in',
    templateUrl: 'views/sign-in.html',
    controller: 'SignInController',
    controllerAs: 'signInCtrl'
  });
  $stateProvider.state(signOutStateName, {
    url: '/sign-out',
    controller: function($auth, $location) {
      $auth.logout();
      $location.path(signOutRedirectTo);
    }
  });
}

function anonymousRedirect($rootScope, $state, $auth) {
  var signInStateName = SIGN_IN_STATE_NAME;
  var signOutStateName = SIGN_OUT_STATE_NAME;
  $rootScope.$on('$stateChangeStart', function(evt, toState) {
    if (!$auth.isAuthenticated()) {
      if (toState.name === signInStateName) return;
      if (toState.name === signOutStateName) return;
      console.log('not login, redirect to signin');
      evt.preventDefault();
      return $state.go(signInStateName);
    }
  });
}

function SignInController($auth, $location) {
  var signInRedirectTo = SIGN_IN_REDIRECT_TO;
  this.signIn = function(credentials) {
    $auth.login(credentials)
      .then(function() {
        $location.path(signInRedirectTo);
      });
  };
}

function ChangeOwnPwdController($scope, $http, notification, $auth, $location) {
  $scope.password = {
    password: "",
    confirm: ""
  };
  var signOutRedirectTo = SIGN_OUT_REDIRECT_TO;
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
