var app = angular.module('treasurerApp');

app.factory('Transaction', function($resource) {
  return $resource('/treasurer/api/v1/transactions/:id',
         {id: '@id'},
         {'query':  {method: 'GET', isArray: false},
         'last': {method: 'GET', isArray: false}});
});
