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
showtime.controller('ChannelsCtrl', function($scope, showtimeService) {

	showtimeService.getchannels().then(function(channels) {
		$scope.channels = channels;
	}, function(status) {
		console.log(status);
	});
	
});

showtime.controller('ProgramsCtrl', function($scope, $routeParams, showtimeService) {

	showtimeService.getPrograms($routeParams.channel).then(function(programs) {
		console.log(programs);
	}, function(status) {
		console.log("Return status", status);
	});

});


showtime.factory("showtimeService", function($http, $q) {
	var channels = "assets/channels.json";
	return {
		getchannels: function() {

			var deferred = $q.defer();

			$http.get(channels).
				success(function(data, status, headers, config) {
					deferred.resolve(data);
				}).error(function(data, status, headers, configs) {
					deferred.reject(status);
				});

			return deferred.promise;
		},

		getPrograms: function(channel) {

			var servicePath = 'http://indian-television-guide.appspot.com/indian_television_guide?channel='+ channel +'&date=17062014';
			var deferred = $q.defer();

			$http.jsonp(servicePath).
				success(function(data, status, headers, config) {
					deferred.resolve(data);
				}).error(function(data, status, headers, configs) {
					deferred.reject(status);
				});

			return deferred.promise;
		}
	}
});