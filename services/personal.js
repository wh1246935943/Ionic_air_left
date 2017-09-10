
//你在这里写服务
angular.module('starter.services')
// 姓名获取
  .factory('nameRoom',function($http,$q){
    return{
      // 获取姓名
      getNameList:function(a){
        var dataGet=$q.defer();
        $http({
          method:'GET',
          url:api.url.getNameList,
          params:{
            token:TOKEN,
            normal_user_id:USER_ID
          }
        }).then(function(response){
          dataGet.resolve(response);
          console.log(response);
        },function(response){
          dataGet.reject(response);
          console.log('ERROR:个人中心--获取姓名',response);
        })
        return dataGet.promise;
      },
    }
  })
//个人信息
  .factory('personalInfoRoom',function($http,$q){
    return{
      // 获取个人信息
      getPersonalInfoList:function(){

        var dataGet=$q.defer();
        $http({
          method:'GET',
          url:api.url.getPersonalInfoList,
          params:{
            token:TOKEN,
            normal_user_id:USER_ID
          }
        }).then(function(response){
          dataGet.resolve(response);
          console.log(response);
        },function(response){
          dataGet.reject(response);
          console.log('ERROR:个人中心--获取个人信息',response);
        })
        return dataGet.promise;
      },
    }
  })
  //家庭联系人
.factory('familyContactsRoom',function($http,$q){
  return{
    // 获取家庭信息
    getFamilyContactsList:function(){

      var dataGet=$q.defer();
      $http({
        method:'GET',
        url:api.url.getFamilyContactsList,
        params:{
          token:TOKEN,
          normal_user_id:USER_ID
        }
      }).then(function(response){
        dataGet.resolve(response);
        console.log(response);
      },function(response){
        dataGet.reject(response);
        console.log('ERROR:个人中心--获取家庭信息',response);
      })
      return dataGet.promise;
    },
  }
})
//刷新联系人
  .factory('rushContactsRoom',function($http,$q){
    return{
      //添加联系人
      getRushContactsList:function(a){

        var dataGet=$q.defer();
        $http({
          method:'POST',
          url:api.url.getRushContactsList,
          params:a
        }).then(function(response){
          dataGet.resolve(response);
          console.log(response);
        },function(response){
          dataGet.reject(response);
          console.log('ERROR:个人中心--获取刷新联系人',response);
        })
        return dataGet.promise;
      },
    }
  })
  //添加联系人
  .factory('addContactsRoom',function($http,$q){
    return{
      //添加联系人
      getAddContactsList:function(a){

        var dataGet=$q.defer();
        $http({
          method:'POST',
          url:api.url.getAddContactsList,
          params:a


        }).then(function(response){
          dataGet.resolve(response);
          console.log(response);
        },function(response){
          dataGet.reject(response);
          console.log('ERROR:个人中心--获取添加联系人',response);
        })
        return dataGet.promise;
      },
    }
  })
//编辑联系人
  .factory('reviseContactsRoom',function($http,$q){

    function transformRequest(obj){
      var str=[];
      for(var p in obj){
        str.push(p+'='+encodeURIComponent(obj[p]));
      }
      console.log(str);
      return str.join("&");
    }

    return{
      //更新联系人
      getReviseContactsList:function(a){

        var dataGet=$q.defer();
        $http({
          method:'POST',
          url:api.url.getReviseContactsList,
          data:transformRequest(a),
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          },
          responseType:'json'
        }).then(function(response){
          dataGet.resolve(response);
          console.log(response);
        },function(response){
          dataGet.reject(response);
          console.log('ERROR:个人中心--获取刷新联系人',response);
        })
        return dataGet.promise;
      },

      //删除联系人
      getDeleteContactsList:function(a){

        var dataGet=$q.defer();
        $http({
          method:'POST',
          url:api.url.getDeleteContactsList,
          data:transformRequest(a),
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          },
          responseType:'json'
        }).then(function(response){
          dataGet.resolve(response);
          console.log(response);
        },function(response){
          dataGet.reject(response);
          console.log('ERROR:个人中心--获取删除联系人',response);
        })
        return dataGet.promise;
      },
    }
  })
//支付接口
  .factory('payContactsRoom',function($http,$q){
    return{
      // 已支付
      getPayContactsList:function(){

        var dataGet=$q.defer();
        $http({
          method:'GET',
          url:api.url.getPayContactsList,
          params:{
            token:TOKEN,
            normal_user_id:USER_ID
          }
        }).then(function(response){
          dataGet.resolve(response);
          console.log(response);
        },function(response){
          dataGet.reject(response);
          console.log('ERROR:个人中心--获取支付信息',response);
        })
        return dataGet.promise;
      },
      getNotPayContactsList:function(){

        var dataGet=$q.defer();
        $http({
          method:'GET',
          url:api.url.getNotPayContactsList,
          params:{
            token:TOKEN,
            normal_user_id:USER_ID
          }
        }).then(function(response){
          dataGet.resolve(response);
          console.log(response);
        },function(response){
          dataGet.reject(response);
          console.log('ERROR:个人中心--获取未支付信息',response);
        })
        return dataGet.promise;
      },
    }
  })




