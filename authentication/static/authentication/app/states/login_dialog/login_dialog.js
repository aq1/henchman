var app = angular.module('authentication');

app.controller('LoginDialogCtrl', ['$scope', '$http', 'AuthorizationService', 'forRegistration',
    function ($scope, $http, AuthorizationService, forRegistration) {

        $scope.error = null;
        $scope.hide = AuthorizationService.hide;
        $scope.forRegistration = forRegistration;

        window.s = $scope;

        $scope.login = function () {
            delete $scope.error;
            AuthorizationService.login($scope.email, $scope.password).then(function (r) {
                AuthorizationService.setUser(r.data);
                $scope.hide(r.data);
            }, function(r) {
                $scope.error = r.data.message;
            });
        };
    }]);
