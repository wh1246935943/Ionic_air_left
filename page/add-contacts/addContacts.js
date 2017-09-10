angular.module('starter')
  .controller('addContactsCtrl', function ($scope, $location,$ionicLoading,addContactsRoom,during) {
    $scope.user={
      name:'',
      phone:  '',
      gender:'',
      normal_user_id:USER_ID,
      address:'',
      identity_card:'',
      token:TOKEN
    }

    $scope.onSaveButtonClick=function () {
      if(!$scope.user.name){
        during.show('用户名不能为空')
      }
      else if(!(/[\u4e00-\u9fa5]/.test($scope.user.name))){
        during.show('请输入正确的用户名');
        return;
      }
      if(!$scope.user.identity_card){
        during.show('身份证不能为空')
      }
      else if(!(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test($scope.user.identity_card))){
        during.show('请输入正确的身份证');
        return;
      }
      if(!$scope.user.gender){
        during.show('性别不能为空')
      }
      if(!$scope.user.address){
        during.show('地址不能为空')
      }
      else if(!(/[\u4e00-\u9fa5]/.test($scope.user.name))){
        during.show('请输入正确的地址');
        return;
      }
      if(!$scope.user.phone){
        during.show('电话不能为空')
      }
      else if(!(/\d{3}-\d{8}|\d{4}-\{7,8}/.test($scope.user.name))){
        during.show('请输入正确的电话');
        return;
      }
      console.log($scope.user)
      addContactsRoom.getAddContactsList($scope.user).then(function (response) {
        console.log(response)
        $scope.addContactsData=response.data.result;
        during.show('恭喜您，已成功新增家庭联系人！');

            history.go(-1);

      })

    }



  })
