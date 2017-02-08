var app = angular.module('chart', ['autoModels']);


app.factory('ChartService', ['$http', 'Model', 'utils', function($http, Model, utils) {
    var service = this;
    window.aaa = service;

    service.statisticsURL = '/treasurer/api/v1/transaction/statistics';
    service.parentID = null;

    service.convertResponseToCharData = function(r) {
        var data = [];
        r.data.forEach(function(item) {
            data.push({label: item.name, value: Math.abs(item.total), id: item.id});
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

    service.updateChart = function() {
        service.getStatisticsForCategory(service.parentID).then(function(r) {
            service.pie.options.currentURL = url;
            service.pie.updateProp('data.content', service.convertResponseToCharData(r));
        });
    };

    service.drawChart = function(r) {
        config.data.content = service.convertResponseToCharData(r);
        config.callbacks = {
            onClickSegment: function(info) {
                service.getStatisticsForCategory(info.data.id).then(function(r) {
                    var content = service.convertResponseToCharData(r);
                    if (!content.length) {
                        return;
                    }
                    service.pie.updateProp('data.content', content);
                });
            }
	    };
	    console.log(config);
            service.pie = new d3pie('treasurer-chart', config);
    };

    return {
        drawChart: service.drawChart,
        init: function(appName) {
            var date = new Date();
            service.getStatisticsForCategory().then(function(r) {
                service.drawChart(r);
            });
        }
    };
}]);


var config =  {
    header: {
        title: {
			text: "Statistics",
			color: "#333333",
			fontSize: 18,
		}
    },
	data: {
		sortOrder: 'value-desc',
		content: []
	},
	labels: {
		outer: {
			pieDistance: 32
		},
		inner: {
			hideWhenLessThanPercentage: 3
		},
		mainLabel: {
			fontSize: 11
		},
		percentage: {
			color: '#ffffff',
			decimalPlaces: 0
		},
		value: {
			color: '#adadad',
			fontSize: 11
		},
		lines: {
			enabled: true
		},
		truncation: {
			enabled: true
		}
	},
	effects: {
		pullOutSegmentOnClick: {
			effect: 'linear',
			speed: 400,
			size: 8
		}
	},
	misc: {
		gradient: {
			enabled: true,
			percentage: 100
		}
	},
};
