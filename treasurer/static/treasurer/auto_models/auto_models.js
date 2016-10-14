var app = angular.module('autoModels', []);


app.factory('autoModelsService', ['$http', function($http) {

    return {
        init: function(appName) {
            $http.get('/static/' + appName + '/models.js').then(function(r) {
                console.log(r);
            });
        }
    };

}]);
