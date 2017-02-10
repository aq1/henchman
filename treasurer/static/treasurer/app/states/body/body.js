var app = angular.module('treasurerApp');

app.controller('BodyCtrl', ['$scope', '$http', '$timeout', 'AuthorizationService', 'Model', 'ModelDialog', 'utils',
    function($scope, $http, $timeout, AuthorizationService, Model, ModelDialog, utils) {
        $scope.showLoginDialog = AuthorizationService.showDialog;
        $scope.logout = AuthorizationService.logout;
        $scope.$on('userIsSet', function(event, user) {
            $scope.user = user;
        });

        $scope.modelDialog = ModelDialog;

        $scope.$on('treasurer.Transaction:saved', function(event, transaction) {
            $scope.Account.get(transaction.account).then(function(r) {
                utils.updateArray($scope.accounts)(event, r.data);
            });
        });

        $scope.$on('treasurer.Account:saved', function(event, account) {
            utils.updateArray($scope.accounts)(event, account);
        });

        $scope.$on('treasurer.Account:deleted', function(event, id) {
            utils.removeFromArray($scope.accounts, 'id', id);
        });

        var init = function() {
            $scope.accounts = [];
            try {
                $scope.Account = new Model({
                    model: 'treasurer.Account'
                });
            } catch (e) {
                $timeout(init, 500);
                return;
            }
            $scope.Account.query().then(function(r) {
                $scope.accounts = r.data.results;
            });
        };

        init();
    }
]);
