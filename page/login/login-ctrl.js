angular.module('starter')
  .controller('loginCtrl', function ($scope, $location, $timeout, $state, loginFa, $ionicLoading) {
    var tokenData = localStorage.getItem("token");
    if (!tokenData) {
      //表单验证
      var show = function (a) {
        $ionicLoading.show({
          template: a,
          duration: 2000
        }).then(function () {
          console.log("现在已经有提示功能");
        });
      };
      //点击登陆
      $scope.toHomePage = function (phoneNum, password) {
        if(!phoneNum){
          show('用户名不能为空')
        }
        else if(!(/^1(3|4|5|7|8)\d{9}$/.test(phoneNum))) {
          show('请填写正确的手机号');
        }
        else if (!password) {
          show('密码不能为空')
        }
        else {
          var a = "登录中...";
          $ionicLoading.show({template: a});
          loginFa.loginS(phoneNum, password).then(function (response) {
            console.log(response.data);
            console.log(response.status);
            if(response.status == '500'){
              console.log(111);
              $ionicLoading.hide();
              show('服务器维护中，请稍后再试');
              return;
            }
            //返回成功后跳转到主页
            if (response.data.success == true) {
              $ionicLoading.hide();
              $state.go('airLift.homePage');
              //接收登陆后后台返回的token，并设为全局变量
              TOKEN = response.data.result.token;
              localStorage.setItem("token", TOKEN);
              //获取登陆后接口返回的用户id
              USER_ID = response.data.result.id;
              localStorage.setItem("id", USER_ID);
              console.log(USER_ID + '....这是用户登陆后接口返回的id');
            } else {
              $ionicLoading.hide();
              show('账号或密码错误');
            }
          },function (error) {
            $ionicLoading.hide();
            show('登录失败，请检查你的网络链接');
          })
        }
      };
    } else {
      $state.go('airLift.homePage');
    }
  })
