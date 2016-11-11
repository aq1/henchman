var app = angular.module('treasurerApp');

app.controller('MainPageCtrl', [
    '$scope',
    '$http',
    'AuthorizationService',
    'Model',
    'ModelDialog',
    'utils',
    function ($scope,
              $http,
              AuthorizationService,
              Model,
              ModelDialog,
              utils) {

    window.as = $scope;

    $scope.user = null;
    $scope.accounts = [];
    $scope.transactions = [];

    $scope.showLoginDialog = AuthorizationService.showDialog;
    $scope.logout = AuthorizationService.logout;

    $scope.modelDialog = ModelDialog;

    var Account = new Model({model: 'treasurer.Account'});
    var Transaction = new Model({model: 'treasurer.Transaction'});

    $scope.$on('userIsSet', function(event, user) {
        $scope.user = user;

        if (user) {
            Account.query().then(function(r) {
                $scope.accounts = r.data.results;
            });
            Transaction.request('get', 'last').then(function(r) {
                $scope.transactions = r.data.results;
            });
        } else {
            $scope.accounts = [];
        }
    });

    var updateArray = function(arrayName) {
        return function(event, item) {

            for (var i = $scope[arrayName].length - 1; i >= 0; i--) {
                if ($scope[arrayName][i].id === item.id) {
                    $scope[arrayName][i] = item;
                    return;
                }
            }
            $scope[arrayName].unshift(item);
        };
    };

    var transactionSaved = function(event, item) {
        updateArray('transactions')(event, item);
        Account.get(item.account).then(function(r) {
            updateArray('accounts')(event, r.data);
        });
    };

    $scope.$on('treasurer.Account:saved', updateArray('accounts'));
    $scope.$on('treasurer.Transaction:saved', transactionSaved);

    if (!$scope.user) {
        AuthorizationService.getUser();
    }
}]);
