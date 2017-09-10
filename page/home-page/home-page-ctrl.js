angular.module('starter')
  .controller('homePageCtrl', function ($scope,$state, $location,doctorAlliRecFa,during) {

    doctorAlliRecFa.getDoctorAlliRec().then(function (response) {
      if(response.data.success == false){
        if(response.data.error.code == '4999'){
          during.show('您的账号登录已过期，请重新登录');
          localStorage.clear();
          $state.go('login');
          return;
        }
      }else {
        $scope.toAirClinic = function (path) {
          $location.path(path);
        };
        $scope.toMsSubVisit = function () {
          $state.go('airLift.myService');
        };
        $scope.infoList = response.data.result;
        console.log($scope.infoList);
      }




    })
  })
