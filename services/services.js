angular.module('starter.services')
// 诊室详情
.factory('doctorRoom',function($http,$q){
    return{
        // 获取医生
        getDocList:function(data){
            var dataGet=$q.defer();
            $http({
                method:'GET',
                url:api.url.getDocList,
                params:{
                    speciality_id:data.spId,
                    hospital_id:data.hospitalId,
                    page:0,
                    count:50,
                    token:TOKEN
                }
            }).then(function(response){
                dataGet.resolve(response);
                console.log(response);
            },function(response){
                dataGet.reject(response);
                console.log('ERROR:诊室详情--获取医生',response);
            })
            return dataGet.promise;

        },
        // 获取医生详情
        getDocDetails:function(){
            var dataGet=$q.defer();
            $http({
                method:'GET',
                url:api.url.getDocDetail,
                params:{
                    doctor_id:479,
                    token:TOKEN
                }
            }).then(function(response){
                dataGet.resolve(response);
                console.log(response);
            },function(response){
                dataGet.reject(response);
                console.log('ERROR:诊室详情--获取医生详情',response);
            })
            return dataGet.promise;

        },
        // 获取预约时间列表
        getDateInfo:function(){
            var dataGet=$q.defer();
            $http({
                method:'GET',
                url:api.url.getDateInfo,
                params:{
                    doctor_id:479,
                    address_id:8,
                    token:TOKEN
                }
            }).then(function(response){
                dataGet.resolve(response);
                console.log(response);
            },function(response){
                dataGet.reject(response);
                console.log('ERROR:诊室详情--获取预约时间列表',response);
            })
            return dataGet.promise;

        },
        // 获取病人列表
        getPatientList:function(){
            console.log(USER_ID,'00000000000')
            var dataGet=$q.defer();
            $http({
                method:'GET',
                url:api.url.getPatientInfo,
                params:{
                    normal_user_id:USER_ID,
                    token:TOKEN
                }
             }).then(function(response){
                dataGet.resolve(response);
                console.log(response);
            },function(response){
                dataGet.reject(response);
                console.log('ERROR:诊室详情--获取病人列表',response);
            })
            return dataGet.promise;

        },
        // 支付订单
        payBills:function(data){
            var dataGet=$q.defer();
            console.log('============支付接口调用============='+'参数'+data.order_id);
            $http({
                method:'POST',
                url:api.url.payBill,
                params:data
             }).then(function(response){
                console.log('============支付成功============='+JSON.stringify(response));
                dataGet.resolve(response);
            },function(response){
                dataGet.reject(response);
                colsole.log('============支付失败=============',222)
                console.log('ERROR:诊室详情--支付订单',response);
            })
            return dataGet.promise;

        }
        
    }
})
angular.module('starter.services')
// 弹出框
.factory('during',function($http,$q,$ionicLoading){
    return{
        show:function(data) {
          $ionicLoading.show({
            template: data,
            duration: 3000
          }).then(function(){
             console.log("The loading indicator is now displayed");
          });
        },
        hide:function(){
          $ionicLoading.hide().then(function(){
             console.log("The loading indicator is now hidden");
          })
        }
    }
})

angular.module('starter.services')
// get方法封装
.factory('getFun',function($http,$q){
    return{
        getMethod:function(urls,data){
            console.log(USER_ID+'00000000000')
            var dataGet=$q.defer();
            $http({
                method:'GET',
                url:urls,
                params:data
             }).then(function(response){
                dataGet.resolve(response);
                console.log(response);
            },function(response){
                dataGet.reject(response);
                console.log('ERROR:get方法封装----',response);
            })
            return dataGet.promise;

        }
        
    }
})