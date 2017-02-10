var app = angular.module('chart');

app.controller('ChartCtrl', [
    '$scope',
    'ChartService',
    function ($scope,
              ChartService) {
        $scope.$on('userIsSet', function(event, user) {
            if (user) {
                ChartService.getChart().then(function(chart) {
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
            ChartService.updateData($scope.chart.data[1 + v.row][2]);
        };

        $scope.$on('treasurer.Transaction:saved', function() {ChartService.updateData();});
    }]);
