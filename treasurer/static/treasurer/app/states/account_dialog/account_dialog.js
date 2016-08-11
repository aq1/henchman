var app = angular.module('authentication');

app.controller('AccountDialogCtrl', ['$scope', '$http', 'AccountDialogService', 'Account', 'accountId',
    function ($scope, $http, AccountDialogService, Account, accountId) {
        $scope.hide = AccountDialogService.hide;
        $scope.accountId = accountId;

        if ($scope.accountId) {
            Account.get({id: $scope.accountId}).then(function(account) {
                $scope.account = account;
            });
        }
        $scope.save = Account.save;
    }]);
