angular.module('starter')
.controller('myAppointmentCtrl',function ($scope,payContactsRoom) {
  $scope.payUserdata={
    normaluserid:USER_ID,
    page:'',
    count:''
  }
  payContactsRoom.getPayContactsList($scope.payUserdata).then(function (response) {
    console.log(response)
    $scope.payData=response.data.result
  })
  payContactsRoom.getNotPayContactsList($scope.payUserdata).then(function (response) {
    console.log(response)
    $scope.payData=response.data.result
  })
})
