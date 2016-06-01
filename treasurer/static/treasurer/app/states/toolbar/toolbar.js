var app = angular.module('treasurerApp');

app.controller('ToolbarCtrl', ['$scope', '$http', 'AuthorizationService', function ($scope, $http, AuthorizationService) {
    $scope.showLoginDialog = AuthorizationService.showDialog;

    $scope.$on('userIsSet', function(event, user) {
        $scope.user = user;
    });
}]);
