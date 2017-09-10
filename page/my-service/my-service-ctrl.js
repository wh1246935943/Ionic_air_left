angular.module('starter')
  .controller('myServiceCtrl', function ($scope,myServiceFa,$ionicLoading) {

    var show = function(a) {
      $ionicLoading.show({
        template: a,
        duration: 2000
      }).then(function(){
        console.log("现在已经有提示功能");
      });
    };

    $scope.showList = 3;
    $scope.showToVisit=true;

    $scope.clickCla1 = function () {
      //获取某个用户已确认等待的服务
      myServiceFa.getMyService(USER_ID).then(function (response) {
        if(response.data.result.length == 0){
          show('没有已确认的服务')
        }else{
          $scope.myServiceInfo = response.data.result;
          console.log($scope.myServiceInfo,'获取某个用户已确认等待的服务')
        }
      });
      $scope.showAcknowledged = true;
      $scope.showTbc = false;
      $scope.showToVisit = false;
      $scope.showUnpaid  = false;
      $scope.showList = 1;

      console.log(123);
    };
    $scope.clickCla2 = function () {
      myServiceFa.getUnconfirmed(USER_ID).then(function (response) {
        if(response.data.result.length == 0){
          show('没有待确认的服务')
        }else{
          $scope.getUnconfirmedInfo = response.data.result;
          console.log($scope.getUnconfirmedInfo,'获取某个用户未确认等待的服务')
        }
      });
      console.log(123);
      $scope.showTbc = true;
      $scope.showAcknowledged = false;
      $scope.showToVisit = false;
      $scope.showUnpaid = false;
      $scope.showList = 2;
    };
    $scope.clickCla3 = function () {
      $scope.showToVisit = true;
      $scope.showTbc = false;
      $scope.showAcknowledged = false;
      $scope.showUnpaid = false;
      console.log(123);
      $scope.showList = 3;
    };
    $scope.clickCla4 = function () {
      myServiceFa.getNonPayment(USER_ID).then(function (response) {
        if(response.data.result.length == 0){
          show('没有未支付的订单')
        }else{
          $scope.getNonPaymentInfo = response.data.result;
          console.log($scope.getNonPaymentInfo,'获取某个用户未支付的订单')
        }
      });
      console.log(123);
      $scope.showUnpaid = true;
      $scope.showTbc = false;
      $scope.showToVisit = false;
      $scope.showAcknowledged = false;
      $scope.showList = 4;
    }
  })
