angular.module('starter')
  .controller('signInCtrl', function ($scope, $location,$state,$interval,SignInGetVerCodeFa,$timeout,signInFa,$ionicLoading,during) {
    //表单验证
    // var show = function(a) {
    //   $ionicLoading.show({
    //     template: a,
    //     duration: 2000
    //   }).then(function(){
    //     console.log("现在已经有提示功能");
    //   });
    // };
    //获取验证码
    $scope.textGetVer = '获取验证码';//初始值
    $scope.getVerCode = function (phone) {
      console.log(phone);
      if((/^1(3|4|5|7|8)\d{9}$/.test(phone))){
        $scope.verCodeNum = 60;
        $scope.textGetVer = '获取验证码';
        $scope.textGetVer = '重新发送';
        var CountDown = $interval(function () {
          $scope.verCodeNum--;
          if($scope.verCodeNum === 0){
            $interval.cancel(CountDown);
            $scope.textGetVer = '获取验证码';
            $scope.verCodeNum = '';
            // $scope.isClick = false;
          }
          // console.log($scope.verCodeNum)
        },1000);
        //获取验证码接口返回数据
        SignInGetVerCodeFa.SignInGetVerCodeS(phone).then(function (response) {
          console.log(response.data);
          $interval.cancel(CountDown);
          //手机号码存在时提示已存在，
          if(response.data.success == false){
            // $scope.textGetVer = '手机号已存在';
            during.show('手机号已存在');
            // $scope.isClick = false;
          }else {
            // $scope.textGetVer = '验证码已发送';
            during.show('验证码已发送，请查收');
            // $scope.isClick = false;
          }
          $scope.verCodeNum = '';
          //3秒后显示为重新获取
          $timeout(function () {
            $scope.textGetVer = '重新获取';
          },3000)
        })
      }else{
        during.show('请填写正确的手机号')
      }

    };
    $scope.a={
      checkeder:false
    };
    //注册
    $scope.signIn = function (phoneNum, password,sms_code,invitation_code) {

      //表单验证
      if(!phoneNum){
        during.show('用户名不能为空')
      }
      else if(!(/^1(3|4|5|7|8)\d{9}$/.test(phoneNum))){
        during.show('请输入正确的手机号')
      }
      else if(!password){
        during.show('密码不能为空')
      }
      else if(!sms_code){
        during.show('验证码不能为空')
      }
      else if(!invitation_code){
        during.show('邀请码不能为空');
        return;
      }
      else if($scope.a.checkeder == false){
        during.show('同意爱尔生活注册协议才能继续注册')
        return;
      }else{
        signInFa.signIn(phoneNum, password,sms_code,invitation_code).then(function (response) {
          console.log(response.data);
          console.log(phoneNum, password,sms_code,invitation_code);
          if(response.data.success == true){
            during.show('注册成功');
            $timeout(function () {
              $state.go('login');
            },1000)
          }else{
            during.show('注册失败！检查你的邀请码或者验证码是否正确');
            $scope.a.checkeder = false;
          }
        });
      }
    }
  })



















