angular.module('starter')
  .controller('resetCtrl', function ($scope, $location, $state,$ionicHistory,$ionicViewSwitcher,$interval,getVerCodeFa,resetFa,$ionicLoading,$timeout,$ionicHistory) {
    //表单验证
    var show = function(a) {
      $ionicLoading.show({
        template: a,
        duration: 2000
      }).then(function(){
        console.log("现在已经有提示功能");
      });
    };
    $scope.backText=$ionicHistory.backTitle();
    $scope.backLogin = function () {
      $ionicHistory.goBack();
    };
    $scope.textGetVer = '获取验证码';
    $scope.getVerCode = function (phone) {

      if((/^1(3|4|5|7|8)\d{9}$/.test(phone))){
        $scope.verCodeNum = 60;
        $scope.textGetVer = '获取验证码';
        $scope.textGetVer = '重新发送';
        var CountDown = $interval(function () {
          $scope.verCodeNum--;
          if($scope.verCodeNum === -1){
            $interval.cancel(CountDown);
            $scope.textGetVer = '获取验证码';
            $scope.verCodeNum = '';
          }
          // console.log($scope.verCodeNum)
        },1000);
        getVerCodeFa.getVerCodeS(phone).then(function (response) {
          if(response.data.success == true){
            console.log(response);
            $interval.cancel(CountDown);
            show('验证码发送成功');
            $scope.verCodeNum = '';
          }else{
            show('发送失败，请检查您的账号是否正确')
            $interval.cancel(CountDown);
            $scope.verCodeNum = '';
          }

        })
      }else{
        show('请填写正确的手机号')
      };

    };
    $scope.resetPassword = function (phoneNum,sms_code,password) {
      if(!phoneNum){
        show('用户名不能为空')
      }else if(!sms_code){
        show('验证码不能为空')
      }else if(!password){
        show('密码不能为空')
      }else{
        resetFa.resetS(phoneNum,sms_code,password).then(function (response) {
          console.log(response);
          show('正在重置，请稍等');
          if(response.data.success == true){
            show('修改成功');
            $timeout(function () {
              $state.go('login')
            },1000)
          }
          if(response.data.success == false){
            show('修改失败，请重试')
          }
        })
      }

    }
  })
