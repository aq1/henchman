var app = angular.module('authentication');

app.factory('AccountDialogService', ['$mdDialog', function ($mdDialog) {

    var service = this;

    return {
        hide: $mdDialog.hide,
        showDialog: function ($event, accountId) {
            return $mdDialog.show({
                locals: {
                    'accountId': accountId
                },
                clickOutsideToClose: false,
                targetEvent: $event,
                templateUrl: '/static/treasurer/app/states/account_dialog/account_dialog.html',
                controller: 'AccountDialogCtrl'
            });
        }
    };
}]);
