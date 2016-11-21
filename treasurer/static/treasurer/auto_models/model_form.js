var app = angular.module('autoModels');


app.directive('modelForm', function() {
    return {
        restrict: 'E',
        scope: {
            modelName: '=',
            itemId: '=',
            showCancel: '=',
            cancelCallback: '&',
        },
        controller: ['$rootScope', '$scope', '$timeout', '$mdToast', 'autoModelsService', 'Model', 'utils',
        function($rootScope, $scope, $timeout, $mdToast, autoModelsService, Model, utils) {
            window.mfs = $scope;
            if ($scope.showCancel === false) {
                delete $scope.cancelCallback;
            }

            $scope.Model = new Model({model: $scope.modelName});

            if ($scope.itemId) {
                $scope.Model.get($scope.itemId).then(function(r) {
                    $scope.item = r.data;
                });
            } else {
                $scope.item = {};
            }

            $scope.save = function() {
                $scope.Model.save($scope.item).then(function(r) {
                    $rootScope.$broadcast($scope.modelName + ':saved', r.data);
                    if ($scope.cancelCallback) {
                        $scope.cancelCallback();
                    }
                    $mdToast.showSimple('Saved ' + $scope.modelName.split('.')[1]);
                });
            };

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
