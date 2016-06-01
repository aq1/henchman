var app = angular.module('authentication');

app.factory('AuthorizationService', ['$http', '$rootScope', '$mdDialog', function ($http, $rootScope, $mdDialog) {

    var service = this;

    service.setToken = function (token) {
        $http.defaults.headers.common.Authorization = 'Token ' + token;
        window.localStorage.token = token;
        service.token = token;
    };

    service.setUser = function (user) {
        service.user = user;
        $rootScope.$broadcast('userIsSet', user);
    };

    return {
        setToken: service.setToken,
        setUser: service.setUser,
        login: function (username, password) {
            return $http.post('/auth/login/', {username: username, password: password});
        },
        getUser: function () {
            var token = service.token || window.localStorage.token;
            if (token) {
                service.setToken(token);
                $http.get('/auth/api/v1/' + 'users/get_current/').then(function (r) {
                    service.setUser(r.data);
                    $http.get('/auth/api/v1/' + 'users/logout/');
                });
            }
        },
        showDialog: function ($event, forRegistration) {
            return $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                templateUrl: '/static/treasurer/app/states/login_dialog/login_dialog.html',
                controller: 'LoginDialogCtrl'
            }).then(function (data) {
                service.setToken(data.token);
                service.setUser(data.user);
            });
        }
    }
}]);
