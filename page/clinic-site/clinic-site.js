
angular.module('starter')
  .controller('clinicSiteCtrl', function ($scope, $stateParams,airMap) {
    var latLonStr = $stateParams.latLonData;
    var latLon = JSON.parse(latLonStr)
    console.log(latLon);
    airMap.mapServices(latLon);
  })
