showtime.controller('SearchCtrl', function($scope, $location) {
	angular.element('body').addClass('skin-blue full');
	angular.element('.wrapper').addClass('bg-none');

	$scope.search = function(form, term) {
		
		if(form.$valid) {
			$location.url('/search/' + term);
		}	
	}

});


showtime.controller('SearchResultCtrl', function($scope, $http) {
	angular.element('body').removeClass('skin-blue full');
	angular.element('.wrapper').removeClass('bg-none');

	$scope.data = [];

	$http({method: 'GET', url: 'http://localhost:8983/solr/collection1/select?q=arh&wt=json&indent=true'}).
	success(function(data) {
		$scope.data = data.response.docs;
	});

});