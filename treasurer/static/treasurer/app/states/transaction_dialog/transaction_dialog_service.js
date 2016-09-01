var app = angular.module('authentication');

app.factory('TransactionDialogService', ['$rootScope', '$mdDialog', 'Transaction',
    function ($rootScope, $mdDialog, Transaction) {

    var service = this;

    return {
        hide: $mdDialog.hide,
        save: function(transaction) {
            Transaction.save(transaction, function(r) {
                $rootScope.$broadcast('transactionSaved', r);
                $mdDialog.hide();
            });
        },
        showDialog: function ($event, transactionId) {
            return $mdDialog.show({
                locals: {
                    'transactionId': transactionId
                },
                clickOutsideToClose: false,
                targetEvent: $event,
                templateUrl: '/static/treasurer/app/states/transaction_dialog/transaction_dialog.html',
                controller: 'TransactionDialogCtrl'
            });
        }
    };
}]);
