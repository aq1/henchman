var app = angular.module('treasurerApp');

app.factory('Account', function($resource) {
  return $resource('/treasurer/api/v1/accounts/:id',
         {id: '@id'},
         {'query':  {method: 'GET', isArray: false}});
});
