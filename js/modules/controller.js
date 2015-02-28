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