angular.module('starter')
  .controller('accountCtrl', function ($scope,$state,$timeout,$ionicPopup,$ionicViewSwitcher,nameRoom) {
    $scope.toPersonalInfo=function () {
       $state.go('airLift.personalInfo')
    }
    $scope.toModifyPassword=function () {
      $state.go('airLift.reset-center');

    }
    $scope.toMyAppointment=function () {
      $state.go('airLift.myAppointment')
    }
    $scope.toFamilyContacts=function () {
      $state.go('airLift.familyContacts')
    }
    $scope.showConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: '退出',
        template: '你确定要退出当前账号么？'

      });

      confirmPopup.then(function (res) {
        if (res) {
          $state.go('login')
          localStorage.clear()
        } else {

        }
      })
    };
    $scope.getGoLogin=function () {
     $scope.showConfirm()

    }

    nameRoom.getNameList().then(function (response) {
      console.log(response)
      $scope.userData=response.data.result[0]
    })

  });
