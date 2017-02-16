var app = angular.module('chart');


app.directive('chart', function() {
    return {
        restrict: 'E',
        templateUrl: '/static/treasurer/app/states/chart/chart.html',
        scope: {
            range: '@'
        },
        controller: [ '$scope', 'Chart', function ($scope, Chart) {

            var Chart = new Chart();
            $scope.timeRange = {};

            if ($scope.range === 'month') {
                var date = new Date();
                var y = date.getFullYear();
                var m = date.getMonth();

                $scope.timeRange = {
                    from: (new Date(y, m, 1)).toISOString(),
                    to: (new Date(y, m + 1, 0)).toISOString()
                };
            }

            $scope.$on('userIsSet', function(event, user) {
                if (user) {
                    Chart.getChart(null, $scope.timeRange ).then(function(chart) {
                        $scope.chart = chart;
                    });
                } else {
                    $scope.chart = null;
                }
            });

            $scope.select = function(v) {
                if (v === undefined) {
                    return;
                }
                Chart.updateData($scope.chart.data[1 + v.row][2], $scope.timeRange);
            };

            $scope.$on('treasurer.Transaction:saved', function() {Chart.updateData();});
        }]
    };
});
