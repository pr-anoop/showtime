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