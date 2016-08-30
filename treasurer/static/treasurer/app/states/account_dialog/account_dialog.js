var app = angular.module('authentication');

app.controller('AccountDialogCtrl', ['$scope', '$http', 'AccountDialogService', 'accountId',
    function ($scope, $http, AccountDialogService, Account, accountId) {
        $scope.hide = AccountDialogService.hide;
        $scope.account = {
            id: accountId
        };

        if ($scope.account.id) {
            Account.get({id: $scope.account.id}).then(function(account) {
                $scope.account = account;
            });
        }

        $scope.save = AccountDialogService.save;

    }]);
