angular.module('starter')
 .controller('reviseContactsCtrl',function ($scope,$state,$ionicPopup,$timeout,$stateParams,reviseContactsRoom,during) {
   $scope.user=$stateParams.data
   $scope.goToSaveContacts=function () {
   $scope.userDetailUpdate = {
     name:$scope.user.name,
     gender:$scope.user.gender,
     identity_card:$scope.user.identity_card,
     address:$scope.user.address,
     id:$scope.user.id,
     phone:13572229938,
     token:TOKEN
   };
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
     reviseContactsRoom.getReviseContactsList($scope.userDetailUpdate).then(function (response) {
     console.log(response)
     $scope.personalData=response.data.result
   })
     during.show('修改成功');
       history.go(-1);


   }
   $scope.deleteConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: '删除',
       template: '你确定要删除么？'

     });

     confirmPopup.then(function (res) {
       if (res) {
         $state.go('airLift.familyContacts')
       } else {

       }
     })
   };

   $scope.goToDeleteContacts=function () {
     $scope.userDetailUpdate = {
       patient_id:$scope.user.id,
       token:TOKEN
     };
     reviseContactsRoom.getDeleteContactsList($scope.userDetailUpdate).then(function (response) {
       console.log(response)
       $scope.personalData=response.data.result
     })
     $scope.deleteConfirm()
   }
 })
