var app = angular.module('treasurerApp');


app.directive('chartsTab', function() {
    return {
        restrict: 'E',
        templateUrl: '/static/treasurer/app/states/charts_tab/charts_tab.html',
        controller: [ '$scope', 'AuthorizationService',
            function ($scope, AuthorizationService) {
                $scope.months = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ];
            }]
    };
});
