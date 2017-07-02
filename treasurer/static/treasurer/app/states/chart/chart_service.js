var app = angular.module('chart', ['autoModels']);


app.factory('Chart', ['$http', '$q', '$filter', '$mdToast', 'Model', 'utils',
    function($http, $q, $filter, $mdToast, Model, utils) {
        var service = this;
        window.aaa = service;

        var Chart = function() {
            var chart = this;

            chart.statisticsURL = '/treasurer/api/v1/transaction/statistics';
            chart.total = null;
            chart.parentID = null;

            chart.convertResponseToChartData = function(r) {
                var data = [['Category', 'Total', 'id']];
                r.data.by_category.forEach(function(item) {
                    data.push([item.name, Math.abs(item.total), item.id]);
                });
                return data;
            };

            chart.getStatisticsForCategory = function(_id, timeRange) {
                chart.parentID = _id;
                var data = {
                    id: _id,
                    from: timeRange.from,
                    to: timeRange.to
                };
                return $http.get(chart.statisticsURL, {params: data});
            };

            chart.updateData = function (categoryId, timeRange) {
                chart.getStatisticsForCategory(categoryId, timeRange).then(function(r) {
                    var data = chart.convertResponseToChartData(r);

                    if (data.length === 1) {
                        $mdToast.showSimple('No subcategories here');
                        return;
                    }

                    chart.chart.data = data;
                    chart.chart.total = Math.abs(r.data.total);
                });
            };

            chart.getChart = function(categoryId, timeRange) {
                return $q(function(resolve, reject) {
                    chart.getStatisticsForCategory(categoryId, timeRange).then(function(r) {
                        chart.chart = {
                            data: chart.convertResponseToChartData(r),
                            total: Math.abs(r.data.total),
                            type: 'PieChart',
                            options: {
                                height: 300,
                                width: 300,
                                fontSize: 16,
                                legend: {position: 'none'},
                                pieSliceText: 'label',
                                chartArea: {width: '90%', height: '90%'},
                                colors: ['#1F8A70', '#004258', '#FD7400', '#BFDB39', '#F7DD2C', '#14CA83', '#0E3E32'],
                                backgroundColor: 'transparent',
                            }
                        };
                        resolve(chart.chart);
                    });
                });
            };
        };
        return Chart;

}]);
