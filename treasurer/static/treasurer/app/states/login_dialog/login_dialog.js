var app = angular.module('treasurerApp');

app.controller('LoginDialogCtrl', ['$scope', '$http', '$mdDialog', 'AuthorizationService',
    function ($scope, $http, $mdDialog, AuthorizationService) {

    $scope.hide = $mdDialog.hide;

    $scope.login = function() {
        AuthorizationService.login($scope.email, $scope.password).then(function(r) {
            AuthorizationService.setUser(r.data);
            $mdDialog.hide(r.data);
        });
    };
}]);
