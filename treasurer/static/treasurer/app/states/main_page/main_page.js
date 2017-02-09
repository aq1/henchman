var app = angular.module('treasurerApp');

app.controller('MainPageCtrl', [
    '$scope',
    '$http',
    '$timeout',
    'AuthorizationService',
    'ChartService',
    'Model',
    'ModelDialog',
    'utils',
    function ($scope,
              $http,
              $timeout,
              AuthorizationService,
              ChartService,
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
            $scope.Transaction.request('get', 'last').then(function(r) {
                $scope.transactions = r.data.results;
            });
        } else {
            $scope.transactions = [];
        }
    };

    $scope.$on('userIsSet', userIsSet);

    var transactionSaved = function(event, item) {
        utils.updateArray($scope.transactions)(event, item);
    };

    $scope.$on('treasurer.Transaction:saved', transactionSaved);

    if (!$scope.user) {
        AuthorizationService.getUser();
    }
}]);
