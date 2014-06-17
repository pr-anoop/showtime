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