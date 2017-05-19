var app = angular.module('treasurerApp');


app.directive('monthChart', function() {
    return {
        restrict: 'E',
        templateUrl: '/static/treasurer/app/states/month_chart/month_chart.html',
        scope: {
            index: '=',
            month: '='
        },
        controller: ['$scope', '$http',
            function($scope, $http) {
                $scope.chart = null;

                var convertResponseToChartData = function(r) {
                    var data = [['Category', 'Total', {role: 'annotation'}]];
                    r.data.forEach(function(item) {
                        data.push([item.name, Math.abs(item.total), item.name]);
                    });
                    if (data.length === 1) {
                        return null;
                    }
                    return data;
                };

                var monthStatisticURL = '/treasurer/api/v1/transaction/monthstats';
                $scope.year = (new Date()).getFullYear();
                $http.get(monthStatisticURL, {params: {
                    year: $scope.year,
                    month: $scope.index + 1
                }}).then(function(r) {
                    var data = convertResponseToChartData(r);
                    if (!data) {
                        return;
                    }
                    $scope.chart = {
                        data: data,
                        type: 'BarChart',
                        options: {
                            legend: {position: 'none'},
                            bars: 'horizontal',
                            height: 150,
                            chartArea: {
                                width: '90%',
                                height: '90%'
                            },
                            backgroundColor: 'transparent',
                            vAxis: {textPosition: 'none'},
                            tooltip: {trigger: 'none'},
                            annotations: {textStyle: {fontSize: 15}}
                        }
                    };
                });
            }
        ]
    };
});