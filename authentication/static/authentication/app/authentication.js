var authApp = angular.module('authentication', ['ngResource', 'autoModels',]);

authApp.run(['autoModelsService', function(autoModelsService) {
    autoModelsService.init('authentication');
}]);
