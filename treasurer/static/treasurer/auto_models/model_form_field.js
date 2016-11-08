var app = angular.module('autoModels');


app.directive('modelFormField', function() {
    return {
        restrict: 'E',
        scope: {
            field: '=',
        },
        controller: ['$scope', function($scope) {
        }],
        templateUrl: '/static/treasurer/auto_models/model_form_field.html'
    };
});
