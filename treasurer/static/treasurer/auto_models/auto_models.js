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


app.factory('Model', ['$http', function($http) {
    var Model = function (config) {
        var model = this;
        model.name = config.model;
        model.apiUrl = config.model.split('.');
        model.apiUrl = '/' + model.apiUrl[0] + '/api/v1/' + model.apiUrl[1].toLowerCase();

        model.query = function() {
            return $http.get(model.apiUrl);
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

        return model;
    };
    return Model;
}]);
