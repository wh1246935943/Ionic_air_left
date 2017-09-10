angular.module('starter.services')


//高德地图
  .factory('airMap', function () {
    return {
      mapServices: function (latLon) {
        var map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 16,
          center: [latLon.longitude, latLon.latitude]
        });
        var marker = new AMap.Marker({
          position: [latLon.longitude, latLon.latitude]
        });
        marker.setMap(map);
        marker.on('click', function (e) {
          infowindow.open(map, e.target.getPosition());
        })
        AMap.plugin('AMap.AdvancedInfoWindow', function () {
          infowindow = new AMap.AdvancedInfoWindow({
            content: '<div class="info-title">高德地图</div><div class="info-content">',
            offset: new AMap.Pixel(0, -30)
          });
          infowindow.open(map, [latLon.longitude, latLon.latitude]);
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          var toolBar = new AMap.ToolBar();
          var scale = new AMap.Scale();
          map.addControl(toolBar);
          map.addControl(scale);
        })
      }
    }
  })

//注册页面获取验证码
angular.module('starter.services')
  .factory('SignInGetVerCodeFa', function ($http, $q) {
    return {
      SignInGetVerCodeS: function (phone) {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: api.url.signInGetVerCode,
          params:{
            phone:phone
          }
        }).then(function successCallback(response) {
          deferred.resolve(response);
          console.log(response.data)
        });
        return deferred.promise;
      }
    }
  })

//注册
angular.module('starter.services')
  .factory('signInFa', function ($http, $q) {
    return {
      signIn: function (phoneNum, password, sms_code, invitation_code) {
        var deferred = $q.defer();
        $http({
          method: 'POST',
          // url: 'http://1800me5725.iok.la:32766/api/normal_user/register.json',
          url:api.url.signIn,
          params: {
            username: phoneNum,
            password: password,
            sms_code: sms_code,
            invitation_code: invitation_code
          },
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
          deferred.resolve(response);
          console.log(response)
        }, function (response) {
          deferred.reject(response);
          console.log(response);
        });
        return deferred.promise;
      }
    }
  })

//登陆
angular.module('starter.services')
  .factory('loginFa', function ($http, $q) {
    return {
      loginS: function (phoneNum, password) {
        var deferred = $q.defer();
        $http({
          method: 'POST',
          // url: 'http://1800me5725.iok.la:32766/api/normal_user/authenticate.json',
          url:api.url.login,
          data:{
            username: phoneNum,
            password: password
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
          },
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
          deferred.resolve(response);
          console.log(response.data);
        }, function errorCallback(response) {
          deferred.reject(response);
          console.log(response);
        });
        return deferred.promise;
      }
    }
  })


//重置密码获取验证码
angular.module('starter.services')
  .factory('getVerCodeFa',function ($http,$q) {
    return{
      getVerCodeS:function (phoneNum) {
        var deferred = $q.defer();
        $http({
          method:'GET',
          // url:'http://1800me5725.iok.la:32766/api/sms/send_change_password_code.json',
          url:api.url.changPasswordVerCode,
          params:{
            phone:phoneNum
          }
        }).then(function successCallback(response) {
          deferred.resolve(response);
          console.log(response);
        });
        return deferred.promise;
      }
    }
  })


//重置密码
angular.module('starter.services')
  .factory('resetFa',function ($http,$q) {
    return{
      resetS:function (phoneNum,sms_code,password) {
        var deferref = $q.defer();
        $http({
          method:'POST',
          // url:'http://1800me5725.iok.la:32766/api/normal_user/change_password.json',
          url:api.url.changPassword,
          params:{
            username:phoneNum,
            password:password,
            sms_code:sms_code
          },
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
          deferref.resolve(response)
          console.log(response);
        });
        return deferref.promise;
      }

    }
  })

//主页面中名医联盟推荐
angular.module('starter.services')
  .factory('doctorAlliRecFa',function ($http,$q) {
    return{
      getDoctorAlliRec:function () {
        var deferref = $q.defer();
        $http({
          method:'GET',
          url:api.url.doctorAllianceRecommend,
          params:{
            token:TOKEN
          }
        }).then(function successCallback(response) {
          deferref.resolve(response);
          console.log(response);
        },function errorCallback(response) {
          deferref.reject(response);
          console.log(response)
        });
        return deferref.promise
      }
    }
  })


//医院诊所相关
angular.module('starter.services')
  .factory('hospitalFa',function ($http,$q) {
    return{
      //获取所有医院
      getHospital:function () {
        var deferref = $q.defer();
        $http({
          method:'GET',
          url:api.url.getAllHospital,
          params:{
            token:TOKEN
          }
        }).then(function (response) {
          deferref.resolve(response);
          console.log(response)
        },function (response) {
          deferref.reject(response);
          console.log(response)
        });
        return deferref.promise;
      },
      //获取诊室详情
      getClinicPar:function (id) {
        var deferref =$q.defer();
        $http({
          method:'GET',
          url:api.url.getClinicPar,
          params:{
            hospital_id:id,
            token:TOKEN
          }
        }).then(function successCallback(response) {
          deferref.resolve(response);
          console.log(response)
        },function errorCallback(response) {
          deferref.reject(response);
          console.log(response)
        });
        return deferref.promise;
      }
    }
  })

//我的服务
angular.module('starter.services')
  .factory('myServiceFa',function ($http,$q) {
    return{
      //获取某个用户已确认等待的服务
      getMyService:function (id) {
        var deferref = $q.defer();
        $http({
          method:'GET',
          url:api.url.myService,
          params:{
            normal_user_id:id,
            confirm_state:2,
            token:TOKEN
          }
        }).then(function successCallback(response) {
          deferref.resolve(response);
          console.log(response,'获取某个用户已确认等待的服务');
        },function errorCallback(response) {
          deferref.reject(response);
          console.log(response)
        });
        return deferref.promise
      },
      //获取某个用户未确认的服务
      getUnconfirmed:function (id) {
        var deferref = $q.defer();
        $http({
          method:'GET',
          url:api.url.getUnconfirmed,
          params:{
            normal_user_id:id,
            token:TOKEN
          }
        }).then(function successCallback(response) {
          deferref.resolve(response);
          console.log(response,'获取某个用户未确认的服务');
        },function errorCallback(response) {
          deferref.reject(response);
          console.log(response)
        });
        return deferref.promise
      },
      //获取某个用户未支付的订单
      getNonPayment:function (id) {
        var deferref = $q.defer();
        $http({
          method:'GET',
          url:api.url.getUnconfirmed,
          params:{
            normal_user_id:id,
            token:TOKEN
          }
        }).then(function successCallback(response) {
          deferref.resolve(response);
          console.log(response,'获取某个用户未支付的订单');
        },function errorCallback(response) {
          deferref.reject(response);
          console.log(response)
        });
        return deferref.promise
      }
    }
  })
