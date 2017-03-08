var utils = angular.module('utils', []);

utils.factory('utils', [function () {

    var findIndexInArray = function(array, field, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][field] === value) {
                return i;
            }
        }
    };

    var findInArray = function(array, field, value) {
        return array[findIndexInArray(array, field, value)];
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

    var removeFromArray = function(array, field, value) {
        array.splice(findIndexInArray(array, field, value), 1);
    };

    var getJSONFromLocalStorage = function(key, defaultValue) {
        return JSON.parse(window.localStorage[key] || null) || defaultValue;
    };

    return {
        findIndexInArray: findIndexInArray,
        findInArray: findInArray,
        updateArray: updateArray,
        removeFromArray: removeFromArray,
        getJSONFromLocalStorage: getJSONFromLocalStorage,
    };
}]);


var capitalizeWord = function(a) {
    return a[0].toUpperCase() + a.slice(1);
};


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
