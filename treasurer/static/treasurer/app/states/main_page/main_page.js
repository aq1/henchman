var app = angular.module('treasurerApp');

app.controller('MainPageCtrl', [
    '$scope',
    '$http',
    '$timeout',
    'AuthorizationService',
    'Model',
    'ModelDialog',
    'utils',
    function ($scope,
              $http,
              $timeout,
              AuthorizationService,
              Model,
              ModelDialog,
              utils) {

    window.as = $scope;

    $scope.user = null;
    $scope.transactions = [];

    $scope.showLoginDialog = AuthorizationService.showDialog;
    $scope.logout = AuthorizationService.logout;

    $scope.modelDialog = ModelDialog;

    var init = function() {
        try {
            $scope.Transaction = new Model({model: 'treasurer.Transaction'});
        } catch (e) {
            $timeout(100, init);
        }
        $scope.transactions = [];
    };

    init();
    var userIsSet = function(event, user) {

        if (!$scope.Transaction) {
            $timeout(100, function() {
                userIsSet(event, user);
            });
            return;
        }

        $scope.user = user;

        if (user) {
            $scope.getTransactions();
        } else {
            $scope.transactions = [];
        }
    };

    $scope.$on('userIsSet', userIsSet);
    $scope.getTransactions = function(url) {
        if (url) {
            var request = $scope.Transaction.request('get', url);
        } else {
            request = $scope.Transaction.query();
        }
        request.then(function(r) {
            $scope.transactions = $scope.transactions.concat(r.data.results);
            $scope.transactionsNextURL = r.data.next;
        });
    };

    var transactionSaved = function(event, item) {
        utils.updateArray($scope.transactions)(event, item);
    };

    $scope.$on('treasurer.Transaction:saved', transactionSaved);

    if (!$scope.user) {
        AuthorizationService.getUser();
    }
}]);
