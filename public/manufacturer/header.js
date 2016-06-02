function headerConfig() {
  return `

<div class="navbar-header">
  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
  <a class="navbar-brand" href="#" ng-click="appController.displayHome()">{{::appController.applicationName}}</a>
</div>
<<<<<<< HEAD
<ul class="nav navbar-top-links navbar-right hidden-xs" ng-controller="UserMenu as userMenu">
  <li><a ui-sref="select-manufacturer">切换厂商</a></li>
  <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"><i class="fa fa-user fa-fw"></i> {{userMenu.name}} <span class="caret"></span></a>
    <ul class="dropdown-menu">
      <li><a ui-sref="changePwd"><i class="fa fa-wrench fa-fw"></i> 修改密码</a></li>
      <li><a ui-sref="logout"><i class="fa fa-sign-out fa-fw"></i> 登出</a></li>
    </ul>
  </li>
=======
<ul class="nav navbar-top-links navbar-right hidden-xs">
  <li><a ui-sref="select-manufacturer">切换厂商</a></li>
  <li><a ui-sref="signOut">修改密码</a></li>
  <li><a ui-sref="logout">登出</a></li>
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
</ul>

  `;
}
