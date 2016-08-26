var utils = angular.module('utils', []);

utils.factory('utils', [function () {

    var findInArray = function(array, field, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][field] === value) {
                return array[i];
            }
        }
    };

    return {
        findInArray: findInArray
    };

}]);
