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
            $timeout(init, 100);
        }
        $scope.transactions = [];
    };
    init();

    var userIsSet = function(user) {
        if (!user) {
            $scope.transactions = [];
            delete $scope.user;
        }

        if ($scope.user) {
            return;
        }

        $scope.user = user;
        if (!$scope.Transaction) {
            $timeout(function() {
                userIsSet(user);
            }, 100);
            return;
        }

        $scope.transactions = [];
        if (user) {
            $scope.getTransactions();
        }
    };

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
    $scope.$on('userIsSet', function(e, user) {userIsSet(user)});
    AuthorizationService.getUser().then(userIsSet, function() {});
}]);
