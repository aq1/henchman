var app = angular.module('autoModels');

app.factory('ModelDialog', ['$rootScope', '$mdDialog',
    function ($rootScope, $mdDialog) {

    var service = this;

    return {
        hide: $mdDialog.hide,
//        save: function(account) {
//            Account.save(account, function(r) {
//                $rootScope.$broadcast('accountSaved', r);
//                $mdDialog.hide();
//            });
//        },
        show: function ($event, config, itemId) {
            return $mdDialog.show({
                locals: {
                    'itemId': itemId,
                    'config': config,
                },
                clickOutsideToClose: true,
                targetEvent: $event,
                templateUrl: '/static/treasurer/auto_models/model_dialog.html',
                controller: ['$scope', 'config', 'itemId', function($scope, config, itemId) {
                    $scope.hide = $mdDialog.hide;
                    $scope.config = config;
                    $scope.itemId = itemId;
                }]
            });
        }
    };
}]);
