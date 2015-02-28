var showtime = angular.module('showtime', ['ngRoute']);
showtime.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/search.html',
      controller: 'SearchCtrl'
    }).when('/search/:term', {
      templateUrl: 'partials/search-results.html',
      controller: 'SearchResultCtrl'
    }).when('/404page', { templateUrl: 'partials/404.html' }).otherwise({ redirectTo: '/404page' });
  }
]);
showtime.controller('SearchCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    angular.element('body').addClass('skin-blue full');
    angular.element('.wrapper').addClass('bg-none');
    $scope.search = function (form, term) {
      if (form.$valid) {
        $location.url('/search/' + term);
      }
    };
  }
]);
showtime.controller('SearchResultCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {
    angular.element('body').removeClass('skin-blue full');
    angular.element('.wrapper').removeClass('bg-none');
    $scope.data = [];
    $http({
      method: 'GET',
      url: 'http://localhost:8983/solr/collection1/select?q=arh&wt=json&indent=true'
    }).success(function (data) {
      $scope.data = data.response.docs;
    });
  }
]);
showtime.factory('showtimeService', [
  '$http',
  '$q',
  function ($http, $q) {
    var channels = 'assets/channels.json';
    return {
      getchannels: function () {
        var deferred = $q.defer();
        $http.get(channels).success(function (data, status, headers, config) {
          deferred.resolve(data);
        }).error(function (data, status, headers, configs) {
          deferred.reject(status);
        });
        return deferred.promise;
      },
      getPrograms: function (channel) {
        var servicePath = 'http://indian-television-guide.appspot.com/indian_television_guide?channel=' + channel + '&date=17062014';
        var deferred = $q.defer();
        $http.jsonp(servicePath).success(function (data, status, headers, config) {
          deferred.resolve(data);
        }).error(function (data, status, headers, configs) {
          deferred.reject(status);
        });
        return deferred.promise;
      }
    };
  }
]);