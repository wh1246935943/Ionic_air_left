angular.module('starter')
  .controller('personalInfoCtrl', function ($scope, $location,$ionicLoading,personalInfoRoom,rushContactsRoom,$state,during) {
    $scope.personalData={
    }

    var show = function(a) {
      $ionicLoading.show({
        template: a,
        duration: 3000
      }).then(function(){
        console.log("The loading indicator is now displayed");
      });
    };
    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });
    };
    $scope.onSaveButtonClick=function () {
      if(!$scope.personalData.name){
        show('用户名不能为空');
        return;
      }
      else if(!(/[\u4e00-\u9fa5]/.test($scope.personalData.name))){
        show('请输入正确的用户名');
        return;
      }
      if(!$scope.personalData.identity_card){
        show('身份证不能为空');
        return;
      }
      else if(!(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test($scope.personalData.identity_card))){
        show('请输入正确的身份证');
        return;
      }
      if(!$scope.personalData.gender){
        show('性别不能为空');
        return;
      }
      if(!$scope.personalData.address){
        show('地址不能为空');
        return;
      }
      else if(!(/[\u4e00-\u9fa5]/.test($scope.personalData.address))){
        show('请输入正确的地址');
        return;
      }
      $scope.userDetailUpdate = {
        name:$scope.personalData.name,
        gender:$scope.personalData.gender,
        identity_card:$scope.personalData.identity_card,
        address:$scope.personalData.address,
        id:USER_ID,
        phone:13572229938,
        token:TOKEN
      };
      rushContactsRoom.getRushContactsList($scope.userDetailUpdate).then(function (response) {
        console.log(response)
        $scope.personalData=response.data.result
        during.show('修改成功！');
          history.go(-1);

      })
      // $state.go('airLift.account')


    }

    personalInfoRoom.getPersonalInfoList($scope.userDetailUpdate).then(function (response) {
      console.log(response)

      $scope.personalData=response.data.result
    })
  })
