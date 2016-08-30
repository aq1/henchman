var app = angular.module('treasurerApp');

app.factory('Category', function($resource) {
  return $resource('/treasurer/api/v1/categories/:id',
         {id: '@id'},
         {'query':  {method: 'GET', isArray: false}});
});
