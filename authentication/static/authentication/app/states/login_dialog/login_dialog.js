var app = angular.module('authentication');

app.controller('LoginDialogCtrl', ['$scope', '$http', '$mdDialog', 'AuthorizationService', 'forRegistration',
    function ($scope, $http, $mdDialog, AuthorizationService, forRegistration) {

        $scope.hide = $mdDialog.hide;
        $scope.forRegistration = forRegistration;

        $scope.login = function () {
            AuthorizationService.login($scope.email, $scope.password).then(function (r) {
                AuthorizationService.setUser(r.data);
                $mdDialog.hide(r.data);
            });
        };
    }]);
