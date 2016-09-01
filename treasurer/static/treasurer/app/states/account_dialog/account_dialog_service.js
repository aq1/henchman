var app = angular.module('authentication');

app.factory('AccountDialogService', ['$rootScope', '$mdDialog', 'Account',
    function ($rootScope, $mdDialog, Account) {

    var service = this;

    return {
        hide: $mdDialog.hide,
        save: function(account) {
            Account.save(account, function(r) {
                $rootScope.$broadcast('accountSaved', r);
                $mdDialog.hide();
            });
        },
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
