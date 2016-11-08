var app = angular.module('autoModels');


app.directive('modelForm', function() {
    return {
        restrict: 'E',
        scope: {
            modelName: '=',
        },
        controller: ['$scope', '$timeout', 'autoModelsService', 'utils', function($scope, $timeout, autoModelsService, utils) {

            var init = function() {
                if (!autoModelsService.getModels().length) {
                    $timeout(init, 100);
                    return;
                }
                $scope.model = utils.findInArray(autoModelsService.getModels(), 'name', $scope.modelName);
            };

            init();
        }],
        templateUrl: '/static/treasurer/auto_models/model_form.html'
    };
});
