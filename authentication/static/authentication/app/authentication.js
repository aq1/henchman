var authApp = angular.module('authentication', ['ngResource']);

authApp.run(['AuthorizationService', function(AuthorizationService) {
    AuthorizationService.getUser();
}]);
