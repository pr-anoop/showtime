var showtime = angular.module('showtime', ['ngRoute']);
showtime.controller('ChannelsCtrl', [
  '$scope',
  'stChannels',
  function ($scope, stChannels) {
    stChannels.getchannels().then(function (channels) {
      $scope.channels = channels;
    }, function (status) {
      console.log(status);
    });
  }
]);
showtime.factory('stChannels', [
  '$http',
  '$q',
  function ($http, $q) {
    var channels = 'assets/channels.json';
    return {
      getchannels: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: channels
        }).success(function (data, status) {
          deferred.resolve(data);
        }).error(function (data, status) {
          deferred.reject(status);
        });
        return deferred.promise;
      }
    };
  }
]);