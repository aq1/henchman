var app = angular.module('autoModels', ['utils']);


app.factory('autoModelsService', ['$http', function($http) {

    var service = this;
    service.models = [];

    return {
        init: function(appName) {
            $http.get('/static/' + appName + '/models.js').then(function(r) {
                service.models = service.models.concat(r.data);
            });
        },
        getModels: function() {
            return service.models;
        }
    };
}]);


app.factory('Model', ['$http', 'autoModelsService', 'utils', function($http, autoModelsService, utils) {
    var Model = function (config) {
        var model = this;

        if (!utils.findInArray(autoModelsService.getModels(), 'name', config.model)) {
            throw {
                message: 'No model found with name ' + config.model
            }
        }

        model.name = config.model;
        model.apiUrl = config.model.split('.');
        model.apiUrl = '/' + model.apiUrl[0] + '/api/v1/' + model.apiUrl[1].toLowerCase();

        model.query = function(params) {
            if (!params) {
                params = {};
            }

            if (!params.all && !params.page) {
                params.page = 1;
            }

            var query = [];
            for (var k in params) {
                query.push(k + '=' + params[k]);
            }

            return $http.get(model.apiUrl + '?' + query.join('&'));
        };

        model.get = function(id) {
            return $http.get(model.apiUrl + '/' + id);
        };

        model.save = function(item) {
            if (item.id) {
                return $http.put(model.apiUrl + '/' + item.id, item);
            } else {
                return $http.post(model.apiUrl, item);
            }
        };

        model.request = function(method, url, data) {
            return $http({
                method: method,
                url: model.apiUrl + '/' + url + '?page=1',
                data: data
            });
        }

        return model;
    };
    return Model;
}]);
