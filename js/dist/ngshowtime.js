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
showtime.controller('SearchCtrl', function($scope, $location) {
	angular.element('body').addClass('skin-blue full');
	angular.element('.wrapper').addClass('bg-none');

	$scope.search = function(form, term) {
		
		if(form.$valid) {
			$location.url('/search/' + term);
		}	
	}

});


showtime.controller('SearchResultCtrl', function($scope, $http, $location, $routeParams) {
	angular.element('body').removeClass('skin-blue full');
	angular.element('.wrapper').removeClass('bg-none');

	var term = $routeParams.term;

	$scope.search = function(form, term) {
		if(form.$valid) {
			$location.url('/search/' + term);
		}	
	}

	var data = [];


	$scope.data = data.solrDocuments;
	$http({method: 'GET', url: 'http://192.168.1.73:8080/Amritloginsample/CustomDispatchAction.do?searchword='+ term +'+repository&pageNumber=1'}).
	success(function(data) {
		$scope.data = data.solrDocuments;
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