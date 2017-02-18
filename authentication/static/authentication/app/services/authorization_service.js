var app = angular.module('authentication');

app.service('AuthorizationService', ['$q', '$http', '$rootScope', '$mdDialog',
    function ($q, $http, $rootScope, $mdDialog) {

    var service = this;
    this.promise = null;

    this.setToken = function (token) {
        $http.defaults.headers.common.Authorization = 'Token ' + token;
        window.localStorage.token = token;
        service.token = token;
    };

    this.setUser = function (user) {
        service.user = user;
        $rootScope.$broadcast('userIsSet', user);
    };

    this.login = function (username, password) {
        return $http.post('/auth/login/', {username: username, password: password});
    };
    this.register = function (username, password) {
        return $http.post('/auth/register/', {username: username, password: password});
    };
    this.logout = function () {
        $http.get('/auth/api-auth/logout/').then(function () {
            service.setToken('');
            service.setUser(null);
        });
    };
    this.getUser = function () {
        return $q(function(resolve, reject) {
            if (service.user) {
                resolve(service.user);
            } else if (service.promise) {
                service.promise.then(function(r) {
                    resolve(r.data);
                });
            } else {
                reject('Something went badly wrong');
            }
        });
    };
    this.init = function () {
        var token = service.token || window.localStorage.token;
        if (token && !service.promise) {
            service.setToken(token);
            service.promise = $http.get('/auth/api/v1/user/get_current');
            service.promise.then(function (r) {
                service.setUser(r.data);
                service.promise = null;
            });
        }
    };
    this.hide = $mdDialog.hide;
    this.showDialog = function ($event, forRegistration) {
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
                service.setToken(data.token);
                service.setUser(data.user);
            }
        });
    };
}]);
