var app = angular.module('treasurerApp');

app.controller('BodyCtrl', ['$scope', '$http', '$timeout', 'AuthorizationService', 'Model', 'ModelDialog', 'utils',
    function($scope, $http, $timeout, AuthorizationService, Model, ModelDialog, utils) {
        $scope.showLoginDialog = AuthorizationService.showDialog;
        $scope.logout = AuthorizationService.logout;
        $scope.totalDebt = 0;

        $scope.$on('userIsSet', function(event, user) {
            $scope.user = user;
            $scope.accounts = [];
            if (!user) {
                return;
            }
            init();
        });

        $scope.modelDialog = ModelDialog;

        var updateAccount = function(event, transaction) {
            $scope.Account.get(transaction.account).then(function(r) {
                utils.updateArray($scope.accounts)(event, r.data);
            });
        };
        $scope.$on('treasurer.Transaction:saved', updateAccount);
        $scope.$on('treasurer.Transaction:deleted', updateAccount);

        $scope.$on('treasurer.Account:saved', function(event, account) {
            utils.updateArray($scope.accounts)(event, account);
        });

        $scope.$on('treasurer.Account:deleted', function(event, id) {
            utils.removeFromArray($scope.accounts, 'id', id);
        });

        $scope.positiveBalance = function(acc) {
            return (acc.total >= acc.limit);
        };

        var init = function() {
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
                $scope.totalDebt = 0;
                angular.forEach($scope.accounts, function(acc) {
                    var diff = acc.total - acc.limit;
                    if (diff >= 0) {
                        return;
                    }
                    $scope.totalDebt += diff;
                });
            });
        };
    }
]);
