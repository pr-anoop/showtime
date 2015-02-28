var showtime = angular.module('showtime', ['ngRoute']);

showtime.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      }).
      when('/search/:term', {
        templateUrl: 'partials/search-results.html',
        controller: 'SearchResultCtrl'
      }).
      when('/404page', {
        templateUrl: 'partials/404.html'
      }).
      otherwise({
        redirectTo: '/404page'
      });
  }]);