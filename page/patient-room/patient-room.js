  //门诊室
  angular.module('starter')
  .controller('patientRoomCtrl', function($scope,$state,doctorRoom,$stateParams) {
    console.log($stateParams.data,'----------------这是门诊室id');
    var hosId=JSON.parse($stateParams.data);
    $scope.docDetailShow=function () {
      $state.go('airLift.docDetails');
    }
    doctorRoom.getDocList(hosId).then(function(response){
      console.log(response);
      $scope.docRooms=response.data.result;
    },function(response){

    })
  })
