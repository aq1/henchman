var app = angular.module('treasurerApp', ['ngMaterial']);

app.constant('apiRoot', '/api/v1/');

app.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $httpProvider.defaults.withCredentials = true;
}]);

app.run(['$http', 'AuthorizationService', function($http, AuthorizationService) {
    var token = window.localStorage.token;
    if (token) {
        AuthorizationService.setToken(token);
        AuthorizationService.getUser();
    }
}]);
