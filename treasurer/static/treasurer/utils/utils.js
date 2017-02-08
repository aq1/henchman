var utils = angular.module('utils', []);

utils.factory('utils', [function () {

    var findInArray = function(array, field, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][field] === value) {
                return array[i];
            }
        }
    };

    var updateArray = function(array) {
        return function(event, item) {

            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i].id === item.id) {
                    array[i] = item;
                    return;
                }
            }
            array.unshift(item);
        };
    };

    return {
        findInArray: findInArray,
        updateArray: updateArray
    };

}]);


var capitalizeWord = function(a) {
    return a[0].toUpperCase() + a.slice(1);
   }


utils.filter('capitalize', function() {
    return function(input, onlyFirstLetter) {

        if (!input) {
            return;
        }

        if (onlyFirstLetter) {
            return capitalizeWord(input);
        }
        return input.split(' ').map(capitalizeWord).join(' ')
    };
});
