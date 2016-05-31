var app = angular.module('treasurerApp');

app.factory('AuthorizationService', ['$http', '$mdDialog', 'apiRoot', function ($http, $mdDialog, apiRoot) {

    var service = this;

    service.setToken = function (token) {
        $http.defaults.headers.common.Authorization = 'Token ' + token;
        window.localStorage.token = token;
    };

    return {
        setToken: service.setToken,
        login: function (username, password) {
            return $http.post('/login/', {username: username, password: password});
        },
        setUser: function (data) {
            service.setToken(data.token);
            service.user = data.user;
        },
        getUser: function(id) {
            return $http.get(apiRoot + 'users/' + id);
        },
        showDialog: function ($event, forRegistration) {
            return $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                templateUrl: '/static/treasurer/app/states/login_dialog/login_dialog.html',
                controller: 'LoginDialogCtrl'
            });
        }
        //logout: function(username, password) {
        //    return $http.delete('/auth/');
        //}
    }

}]);
