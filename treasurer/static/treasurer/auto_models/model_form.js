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
            $scope.deleteButtonClicked = 0;

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
                    $rootScope.$broadcast('Form Submitted');
                    if ($scope.cancelCallback) {
                        $scope.cancelCallback();
                    }
                    $mdToast.showSimple('Saved ' + $scope.modelName.split('.')[1]);
                });
            };

            $scope.delete = function() {
                $scope.deleteButtonClicked = ($scope.deleteButtonClicked + 1) % 2;
                if ($scope.deleteButtonClicked != 0) {
                    $timeout(function() {
                        $scope.deleteButtonClicked = 0;
                    }, 5000);
                    return;
                }
                $scope.Model.delete($scope.item).then(function(r) {
                    $rootScope.$broadcast($scope.modelName + ':deleted', $scope.item);
                    if ($scope.cancelCallback) {
                        $scope.cancelCallback();
                    }
                    $mdToast.showSimple('Deleted ' + $scope.modelName.split('.')[1]);
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
