var app = angular.module('chart');

app.controller('ChartCtrl', [
    '$scope',
    'ChartService',
    function ($scope,
              ChartService) {
        $scope.getChart = function(categoryId) {
            ChartService.getChart(categoryId).then(function(chart) {
                $scope.chart = chart;
            });
        };

        $scope.select = function(v) {
            if (v === undefined) {
                return;
            }
            ChartService.updateData($scope.chart.data[1 + v.row][2]);
        };

        $scope.getChart();
    }]);
