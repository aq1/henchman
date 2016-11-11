var app = angular.module('authentication');

app.factory('AuthorizationService', ['$http', '$rootScope', '$mdDialog', function ($http, $rootScope, $mdDialog) {

    var service = this;

    var setToken = function (token) {
        $http.defaults.headers.common.Authorization = 'Token ' + token;
        window.localStorage.token = token;
        service.token = token;
    };

    var setUser = function (user) {
        service.user = user;
        $rootScope.$broadcast('userIsSet', user);
    };

    return {
        setToken: setToken,
        setUser: setUser,
        login: function (username, password) {
            return $http.post('/auth/login/', {username: username, password: password});
        },
        register: function (username, password) {
            return $http.post('/auth/register/', {username: username, password: password});
        },
        logout: function () {
            $http.get('/auth/api-auth/logout/').then(function () {
                setToken('');
                setUser(null);
            });
        },
        getUser: function () {
            var token = service.token || window.localStorage.token;
            if (token) {
                setToken(token);
                $http.get('/auth/api/v1/user/get_current').then(function (r) {
                    setUser(r.data);
                });
            }
        },
        hide: $mdDialog.hide,
        showDialog: function ($event, forRegistration) {
            return $mdDialog.show({
                locals: {
                    'forRegistration': forRegistration
                },
                clickOutsideToClose: true,
                targetEvent: $event,
                templateUrl: '/static/authentication/app/states/login_dialog/login_dialog.html',
                controller: 'LoginDialogCtrl'
            }).then(function (data) {
                if (data) {
                    setToken(data.token);
                    setUser(data.user);
                }
            });
        }
    }
}]);
