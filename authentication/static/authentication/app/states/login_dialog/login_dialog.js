var app = angular.module('authentication');

app.controller('LoginDialogCtrl', ['$scope', '$http', 'AuthorizationService', 'forRegistration',
    function ($scope, $http, AuthorizationService, forRegistration) {

        $scope.hide = AuthorizationService.hide;
        $scope.forRegistration = forRegistration;

        $scope.login = function () {
            AuthorizationService.login($scope.email, $scope.password).then(function (r) {
                AuthorizationService.hide(r.data);
            });
        };
    }]);
