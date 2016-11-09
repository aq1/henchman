var app = angular.module('treasurerApp', ['ngMaterial', 'ngRoute', 'ngResource', 'authentication', 'utils', 'autoModels']);

app.constant('urls', {
    apiRoot: '/treasurer/api/v1/',
    authRoot: '/auth/',
    authApi: '/auth/api/v1/'
});

app.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $httpProvider.defaults.withCredentials = true;
}]);


app.config(['$routeProvider', '$resourceProvider',
    function ($routeProvider, $resourceProvider) {
          $routeProvider.
            when('/accounts/', {
                templateUrl: '/static/treasurer/app/states/accounts/accounts.html',
                controller: 'AccountsCtrl'
            }).
            otherwise({
                redirectTo: '/accounts/'
            });

          $resourceProvider.defaults.stripTrailingSlashes = true;
    }
]);


app.run(['autoModelsService', function(autoModelsService) {
    autoModelsService.init('treasurer');
    autoModelsService.init('authentication');
}]);
