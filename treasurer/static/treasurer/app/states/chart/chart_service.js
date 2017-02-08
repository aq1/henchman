var app = angular.module('chart', ['autoModels']);


app.factory('ChartService', ['$http', '$q', 'Model', 'utils', function($http, $q, Model, utils) {
    var service = this;
    window.aaa = service;

    service.statisticsURL = '/treasurer/api/v1/transaction/statistics';
    service.parentID = null;

    service.convertResponseToChartData = function(r) {
        var data = [['Category', 'Total', 'id']];
        r.data.forEach(function(item) {
            data.push([item.name, Math.abs(item.total), item.id]);
        });
        return data;
    };

    service.getStatisticsForCategory = function(id) {
        id = id || '';
        var url = service.statisticsURL
        if (id) {
            url += '?id=' + id;
        }
        service.parentID = id;
        return $http.get(url);
    };

    service.updateData = function (categoryId) {
        service.getStatisticsForCategory(categoryId).then(function(r) {
            service.chart.data = service.convertResponseToChartData(r);
        });
    };

    service.getChart = function(categoryId) {
        return $q(function(resolve, reject) {
            service.getStatisticsForCategory(categoryId).then(function(r) {
                service.chart = {
                    data: service.convertResponseToChartData(r),
                    type: 'PieChart',
                    options: {
                        height: 400,
                        width: 400,
                        fontSize: 16,
                        legend: {position: 'none'},
                        pieSliceText: 'label',
                        colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
                        backgroundColor: 'transparent',
                    }
                };
                resolve(service.chart);
            });
        });
    };

    return {
        updateData: service.updateData,
        getChart: service.getChart,
    };
}]);
