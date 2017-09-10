angular.module('starter')
  .controller('conRoomCtrl', function($scope,$state,$window,$stateParams,hospitalFa) {
    $scope.id = $stateParams.id;//获取clinic列表传来的id
    console.log($scope.id);
    hospitalFa.getClinicPar($scope.id).then(function (response) {
      $scope.conRoomInfo = response.data.result;
      console.log($scope.conRoomInfo);

      //跳转都门诊室内
      $scope.patientGo=function (conRoomId) {
        console.log(conRoomId);
        $state.go('airLift.patientRoom',{data:JSON.stringify({spId:conRoomId,hospitalId:$scope.id})});
      };
      //跳转到地图
      $scope.latLon = {
        longitude:$scope.conRoomInfo.longitude,
        latitude:$scope.conRoomInfo.latitude
      };
      $scope.toClinicSite=function (latLon) {
        console.log(latLon);
        $state.go('airLift.clinicSite',{latLonData:JSON.stringify(latLon)});
      };
      //点击拨打电话
      $scope.callPhone = function (mobilePhone) {
        console.log(mobilePhone);
        $window.location.href = "tel:" + mobilePhone;
      }
    })

  })
