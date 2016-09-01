var app = angular.module('treasurerApp');

app.controller('AccountsCtrl', [
    '$scope',
    '$http',
    'AuthorizationService',
    'AccountDialogService',
    'Account',
    'TransactionDialogService',
    'Transaction',
    'utils',
    function ($scope,
              $http,
              AuthorizationService,
              AccountDialogService,
              Account,
              TransactionDialogService,
              Transaction,
              utils) {

    window.as = $scope;

    $scope.user = null;
    $scope.accounts = [];
    $scope.transactions = [];

    $scope.showLoginDialog = AuthorizationService.showDialog;
    $scope.showAccountDialog = AccountDialogService.showDialog;
    $scope.showTransactionDialog = TransactionDialogService.showDialog;
    $scope.logout = AuthorizationService.logout;

    $scope.$on('userIsSet', function(event, user) {
        $scope.user = user;

        if (user) {
            Account.query(function(r) {
                $scope.accounts = r.results;
            });
            Transaction.last(function(r) {
                $scope.transactions = r.results;
            });
        } else {
            $scope.accounts = [];
        }
    });

    var updateArray = function(arrayName) {
        return function(event, item) {

            for (var i = $scope[arrayName].length - 1; i >= 0; i--) {
                console.log(i);
                console.log($scope[arrayName][i].id);
                if ($scope[arrayName][i].id === item.id) {
                    $scope[arrayName][i] = item;
                    return;
                }
            }
            $scope[arrayName].unshift(item);
        };
    };

    $scope.$on('accountSaved', updateArray('accounts'));
    $scope.$on('transactionSaved', updateArray('transactions'));

    if (!$scope.user) {
        AuthorizationService.getUser();
    }
}]);
