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
            $timeout(500, init);
        }
    };

    init();

    $scope.$on('userIsSet', function(event, user) {
        $scope.user = user;

        if (user) {
            $scope.Transaction.request('get', 'last').then(function(r) {
                $scope.transactions = r.data.results;
            });
        } else {
            $scope.transactions = [];
        }
    });

    var transactionSaved = function(event, item) {
        utils.updateArray($scope.transactions)(event, item);
    };

    $scope.$on('treasurer.Transaction:saved', transactionSaved);

    if (!$scope.user) {
        AuthorizationService.getUser();
    }
}]);
