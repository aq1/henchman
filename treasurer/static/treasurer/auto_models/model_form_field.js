var app = angular.module('autoModels');


app.directive('modelFormField', function() {
    return {
        restrict: 'E',
        scope: {
            field: '=',
            item: '=',
        },
        link: function(scope, element, attr) {
            if (scope.field.type == 'DateTimeField') {
                scope.$watch('item', function(newVal, oldVal) {
                    if (newVal && newVal[scope.field.name]) {
                        newVal[scope.field.name] = new Date(newVal[scope.field.name]);
                    }
                });
            }
        },
        controller: ['$scope', '$http', 'utils', 'Model', 'ModelDialog', function($scope, $http, utils, Model, ModelDialog) {
            $scope.inputType = ({
                FloatField: 'number',
                IntegerField: 'number',
                CharField: 'text',
            })[$scope.field.type];

            $scope.fieldIsActive = function(field) {
                return field.type != 'AutoField' && field.name != 'user';
            };

            $scope.getForeignOptions = function() {
                var model = new Model($scope.field.config);
                model.query({all: 1}).then(function(r) {
                    $scope.items = r.data;
                    $scope.recentChoices = [];
                    var key = $scope.field.config.model + '.' + $scope.field.name;
                    var recentChoicesIDs = JSON.parse(window.localStorage[key] || '[]');
                    recentChoicesIDs.forEach(function (i) {
                        $scope.recentChoices.push(utils.findInArray($scope.items, 'id', parseInt(i)));
                    });
                    $scope.$on('Form Submitted', function() {
                        var i = parseInt($scope.item[$scope.field.name]);
                        var index = recentChoicesIDs.indexOf(i);
                        if (index >= 0) {
                            recentChoicesIDs.splice(index, 1);
                        }
                        recentChoicesIDs.splice(0, 0, i);
                        window.localStorage[key] = JSON.stringify(recentChoicesIDs);
                    });
                });
            };

            if ($scope.field.type.search('ForeignKey') !== -1) {
                $scope.getForeignOptions();
            }

            $scope.openForeignModelDialog = function(event) {
                ModelDialog.show(event, $scope.field.config);
            };
        }],
        templateUrl: '/static/treasurer/auto_models/model_form_field.html'
    };
});
