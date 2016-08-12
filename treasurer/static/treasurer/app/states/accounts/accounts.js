var app = angular.module('treasurerApp');

app.controller('AccountsCtrl', [
    '$scope',
    '$http',
    'AuthorizationService',
    'AccountDialogService',
    'Account',
    function ($scope,
              $http,
              AuthorizationService,
              AccountDialogService,
              Account) {

    window.s = $scope;

    $scope.user = null;
    $scope.accounts = [];

    $scope.showLoginDialog = AuthorizationService.showDialog;
    $scope.showAccountDialog = AccountDialogService.showDialog;
    $scope.logout = AuthorizationService.logout;

    $scope.$on('userIsSet', function(event, user) {
        $scope.user = user;

        if (user) {
            Account.query(function(r) {
                $scope.accounts = r.results;
            });
        } else {
            $scope.accounts = [];
        }
    });

    $scope.$on('accountSaved', function(event, accountId) {
        Account.get({id: accountId}, function (account) {
            $scope.accounts.push(account);
        });
    });

    if (!$scope.user) {
        AuthorizationService.getUser();
    }
}]);
