angular.module('starter')
  .controller('airClinicCtrl', function ($scope, $location,$state,hospitalFa) {

    hospitalFa.getHospital().then(function (response) {
      $scope.clinicList = response.data.result;
      // var
      console.log($scope.clinicList);
      //点击跳转到诊室页面
      $scope.toConRoom = function (id) {
        $state.go('airLift.conRoom',{id:id});
      };
    });
  })
