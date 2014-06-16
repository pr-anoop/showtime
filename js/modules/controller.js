showtime.controller('ChannelsCtrl', function($scope, stChannels) {

	stChannels.getchannels().then(function(channels) {
		$scope.channels = channels;
	}, function(status) {
		console.log(status);
	});
	
});