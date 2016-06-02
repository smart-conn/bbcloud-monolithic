function headerConfig() {
  return [
    '<div class="navbar-header">',
    '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">',
    '<span class="sr-only">Toggle navigation</span>',
    '<span class="icon-bar"></span>',
    '<span class="icon-bar"></span>',
    '<span class="icon-bar"></span>',
    '</button>',
    '<a class="navbar-brand" href="#" ng-click="appController.displayHome()">{{::appController.applicationName}}</a>',
    '</div>',
    '<ul class="nav navbar-nav navbar-right hidden-xs">',
    '<li class="dropdown">',
    '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"><i class="fa fa-money ng-scope"></i>Dropdown <span class="caret"></span></a>',
    '<ul class="dropdown-menu">',
    '<li><a ui-sref="changePwd">changePwd</a></li>',
    '<li><a ui-sref="signOut">登出</a></li>',
    '</ul>',
    '</li>',
    '</ul>'
  ].join('');
}
