var app = angular.module('treasurerApp');

app.controller('AccountsCtrl', [
    '$scope',
    '$http',
    'AuthorizationService',
    'Account',
    function ($scope,
              $http,
              AuthorizationService,
              Account) {
    Account.query(function(accounts) {
        console.log(accounts);
    });

    $scope.showLoginDialog = AuthorizationService.showDialog;
    $scope.logout = AuthorizationService.logout;
    window.s = $scope;
    $scope.$on('userIsSet', function(event, user) {
        $scope.user = user;
    });
}]);
