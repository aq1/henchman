var app = angular.module('treasurerApp');


app.directive('settings', function() {
    return {
        restrict: 'E',
        templateUrl: '/static/treasurer/app/states/settings/settings.html',
        controller: [ '$scope', 'AuthorizationService',
            function ($scope, AuthorizationService) {
                $scope.index = 0;
                $scope.labels = ['Categories'];
        }]
    };
});
