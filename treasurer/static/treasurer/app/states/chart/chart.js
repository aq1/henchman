var app = angular.module('chart');


app.directive('chart', function() {
    return {
        restrict: 'E',
        templateUrl: '/static/treasurer/app/states/chart/chart.html',
        scope: {
            range: '@'
        },
        controller: ['$scope', 'AuthorizationService', 'Chart',
            function ($scope, AuthorizationService, Chart) {
                var Chart = new Chart();
                $scope.timeRange = {};

                if ($scope.range === 'month') {
                    var date = new Date();
                    var y = date.getFullYear();
                    var m = date.getMonth();

                    $scope.timeRange = {
                        from: (new Date(y, m, 1)),
                        to: (new Date(y, m + 1, 0))
                    };
                }

                var init = function() {
                    Chart.getChart(null, $scope.timeRange).then(function(chart) {
                        $scope.chart = chart;
                    });
                };

                $scope.select = function(v) {
                    if (v === undefined) {
                        return;
                    } else if (v === null) {
                        category = v;
                    } else {
                        category = $scope.chart.data[1 + v.row][2]
                    }
                    Chart.updateData(category, $scope.timeRange);
                };

                $scope.$on('userIsSet', function(e, user) {
                    if (!user) {
                        delete $scope.chart;
                        return;
                    } else if ($scope.chart) {
                        return;
                    } else {
                        init();
                    }
                });
                $scope.$on('treasurer.Transaction:saved', function() {
                        if (!$scope.timeRange) {
                            return;
                        }
                        Chart.updateData(null, $scope.timeRange);
                    });

                AuthorizationService.getUser().then(function(user) {
                    if (user) {
                        init();
                    }
                }, function() {});
        }]
    };
});
