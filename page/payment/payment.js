
  //支付
  angular.module('starter')
    .controller('paymentCtrl', function($scope,$ionicHistory,$state,$stateParams,doctorRoom) {    	
   		$scope.paymentType=1;
    	$scope.billInfos=$stateParams.data;
    	$scope.resultId=JSON.parse($scope.billInfos.appointsresult);
		
		$scope.goBack=function(){
			$ionicHistory.goBack(-2);
		}

		// 选择支付方式
		$scope.payType=function(data){
			if(data==0){
				$scope.paymentType=1;
			}else if(data==1){
				$scope.paymentType=2;
			}else{
				console.log('支付订单：====参数错误====');
			}
		}

    	// 支付订单
    	$scope.payIt=function(){
    		doctorRoom.payBills({
	    		order_id:$scope.resultId.result.id,
	    		pay_type:$scope.paymentType,
	    		order_type:'appointment',
	    		token:TOKEN
	    	}).then(function(response){

	    		// ping++调用
	    		var charge=response.data.result;
	    		Pingpp.createPayment(charge, function (result, error) {
	    			// 成功
				    console.log('====成功输出===='+JSON.stringify(result));
				    console.log('====成功输出===='+JSON.stringify(error));
				    alert(result);
    				alert(error);
    				if(result=='success'){
    					$state.go('airLift.myService');
    					$ionicHistory.clearHistory();
    					$ionicHistory.clearCache();
    					$ionicHistory.removeBackView()
    					$ionicHistory.nextViewOptions({
						  historyRoot: true,
						  disableBack: true
						});
    				}
				});

	    	},function(response){
			    console.log('====失败输出===='+JSON.stringify(arguments));
	    	})
    	}
    	

    })
