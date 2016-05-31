var app = angular.module('treasurerApp');

app.controller('ToolbarCtrl', ['$scope', '$http', 'AuthorizationService', function ($scope, $http, AuthorizationService) {
    $scope.showLoginDialog = function ($event, forRegistration) {
        AuthorizationService.showDialog($event, forRegistration).then(function (data) {
            $scope.user = data.user;
        });
    };
}]);
