var showtime = angular.module('showtime', ['ngRoute']);
showtime.controller('ChannelsCtrl', [
  '$scope',
  function ($scope) {
    $scope.language = 'English';
    angular.element('.goto-link').click(function () {
      alert('This also works fine');
    });
  }
]);