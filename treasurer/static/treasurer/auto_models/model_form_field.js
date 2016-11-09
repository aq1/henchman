var app = angular.module('autoModels');


app.directive('modelFormField', function() {
    return {
        restrict: 'E',
        scope: {
            field: '=',
        },
        controller: ['$scope', function($scope) {
            $scope.inputType = ({
                FloatField: 'number',
                IntegerField: 'number',
                CharField: 'text',
            })[$scope.field.type];
            console.log($scope.inputType);
            console.log($scope.field);
        }],
        templateUrl: '/static/treasurer/auto_models/model_form_field.html'
    };
});
