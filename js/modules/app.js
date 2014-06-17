var showtime = angular.module('showtime', ['ngRoute']);

showtime.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/channel-list.html',
        controller: 'ChannelsCtrl'
      }).
      when('/program/:channel', {
        templateUrl: 'partials/programs.html',
        controller: 'ProgramsCtrl'
      }).
      otherwise({
        redirectTo: '/404page'
      });
  }]);