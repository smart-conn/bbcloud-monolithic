startup(url);

function getConfig(url, done) {
  var tokenName = 'satellizer_token';
  var req = new XMLHttpRequest();
  var accessToken = localStore.getItem(tokenName);
  req.addEventListener('load', onLoad);
  // req.addEventListener
  req.setRequestHeader('Authenticate', 'Bearer ' + accessToken);
  req.open('GET', url);
  req.send();
  return;
  function onLoad() {
    done(null, JSON.parse(this.responseText));
  }
  function onError() {
    done(this);
  }
}

function startup(url) {
  Promise.all([
    new Promise(function(resolve, reject) {
      getConfig(url, resolve);
    }),
    new Promise(function(resolve, reject) {
      angular.element(document).ready(resolve);
    });
  ]).then(function() {
    angular.bootstrap('document', ['adminControlPanel']);
  });
}
