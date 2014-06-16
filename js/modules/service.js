showtime.factory("stChannels", function($http, $q) {
	var channels = "assets/channels.json";
	return {
		getchannels: function() {

			var deferred = $q.defer();

			$http({method: "GET", url: channels}).
				success(function(data, status, headers, config) {
					deferred.resolve(data);
				}).error(function(data, status, headers, configs) {
					deferred.reject(status);
				});

			return deferred.promise;
		}
	}
});