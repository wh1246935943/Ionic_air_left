angular.module('starter')
  .controller('familyContactsCtrl', function ($scope,$state,familyContactsRoom) {
    $scope.toAddContacts=function () {
      $state.go('airLift.addContacts')
    }
    $scope.toReviseContacts=function (index) {
      $state.go('airLift.reviseContacts',{
        data:$scope.familyData[index]
      })
    }
    familyContactsRoom.getFamilyContactsList().then(function (response) {
      console.log(response)
      $scope.familyData=response.data.result;
      $scope.familyData.splice(0,1);
        console.log($scope.familyData)
    })
  });
