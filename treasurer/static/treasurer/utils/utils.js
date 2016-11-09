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


var capitalizeWord = function(a) {
    return a[0].toUpperCase() + a.slice(1);
   }


utils.filter('capitalize', function() {
    return function(input, onlyFirstLetter) {
        input = input || '';
        if (onlyFirstLetter) {
            return capitalizeWord(input);
        }
        return input.split(' ').map(capitalizeWord).join(' ')
    };
});
