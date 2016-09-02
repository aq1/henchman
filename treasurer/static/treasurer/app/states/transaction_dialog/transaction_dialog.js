var app = angular.module('authentication');

app.controller('TransactionDialogCtrl', ['$scope', '$http', 'Account', 'Category', 'TransactionDialogService', 'transactionId',
    function ($scope, $http, Account, Category, TransactionDialogService, Transaction, transactionId) {
        window.s = $scope;
        $scope.transaction = {
            id: transactionId,
            date: new Date()
        };
        $scope.hide = TransactionDialogService.hide;

        Account.query(function(r) {
            $scope.accounts = r.results;
        });

        Category.query(function(r) {
            $scope.categories = r.results;
        });

        if ($scope.transaction.id) {
            Transaction.get({id: $scope.transaction.id}).then(function(transaction) {
                $scope.transaction = transaction;
            });
        }

        $scope.categorySelected = function(category) {
            $scope.transaction.category = category.id
        };

        $scope.save = TransactionDialogService.save;
    }]);
