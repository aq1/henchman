var app = angular.module('treasurerApp', [
    'ngMaterial',
    'ngRoute',
    'ngResource',
    'md.data.table',
    'googlechart',
    'utils',
    'autoModels',
    'chart',
    'authentication',
]);

app.constant('urls', {
    apiRoot: '/treasurer/api/v1/',
    authRoot: '/auth/',
    authApi: '/auth/api/v1/'
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $httpProvider.defaults.withCredentials = true;
}]);


app.config(['$routeProvider', '$resourceProvider',
    function($routeProvider, $resourceProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/static/treasurer/app/states/main_page/main_page.html',
            controller: 'MainPageCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

        $resourceProvider.defaults.stripTrailingSlashes = true;
    }
]);


app.run(['autoModelsService', 'AuthorizationService', function(autoModelsService, AuthorizationService) {
    autoModelsService.init('treasurer');
    AuthorizationService.init();
}]);
