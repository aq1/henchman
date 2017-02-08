var app = angular.module('treasurerApp');

app.controller('BodyCtrl', ['$scope', '$http', '$timeout', 'AuthorizationService', 'Model',
    function($scope, $http, $timeout, AuthorizationService, Model) {
        $scope.showLoginDialog = AuthorizationService.showDialog;
        $scope.logout = AuthorizationService.logout;
        $scope.$on('userIsSet', function(event, user) {
            $scope.user = user;
        });

        $scope.$on('transactionSaved', function(event, transaction) {
            $scope.Account.get(item.account).then(function(r) {
                updateArray('accounts')(event, r.data);
            });
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
