var app = angular.module('autoModels', ['utils']);


app.factory('autoModelsService', ['$http', function($http) {

    var service = this;
    service.models = [];
    window.sss = service;

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
