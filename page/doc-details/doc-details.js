  //医生详情
  angular.module('starter')
  .controller('docDetailsCtrl', function($scope, $state,doctorRoom,$stateParams,during) {
    // 获取医生详情
    doctorRoom.getDocDetails().then(function(response){
      console.log(response);
      $scope.docTextInfo=response.data.result;
    },function(response){
      console.log('医生详情获取失败!--'+response);
    });
    // 获取就诊日期
    doctorRoom.getDateInfo().then(function(response){
      console.log(response);
      $scope.dateTextInfo=response.data.result;
      $scope.dateTextInfoCopy=$scope.dateTextInfo.concat();
      console.log($scope.dateTextInfo,'========')
      //Data Get
      $scope.timeTable=$scope.dateTextInfoCopy.splice(0,7);
      $scope.timeTableNext=$scope.dateTextInfoCopy;
      console.log($scope.timeTable,'lalalalallala',$scope.timeTableNext)

      //时间slidebox初始化 
      $scope.dateChecked=new Array(14);
      $scope.dateChecked=$scope.dateChecked.join('0').split('');
      $scope.dateChecked[0]=1;
      $scope.reservationDate=$scope.dateTextInfo[0];
      $scope.dateOptionsInfo=$scope.dateTextInfo[0].am_times;
      $scope.dateOptionsInfo1=$scope.dateTextInfo[0].pm_times;
      $scope.dateChoosen=true;
    },function(response){
      console.log('预约时间信息失败!--'+response);
    })

    //slideBox
    $scope.options = {
      loop: false,
      effect: 'fade',
      speed: 500
    };

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
      // data.slider is the instance of Swiper
      $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
      console.log('Slide change is beginning');
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
      // note: the indexes are 0-based
      $scope.activeIndex = data.slider.activeIndex;
      $scope.previousIndex = data.slider.previousIndex;
    });

    $scope.dateOpt=function (index) {
      if(index>6){
        $scope.dateChoosen=false;
      }else{
        $scope.dateChoosen=true;

      }

      // 获取就诊日期
      doctorRoom.getDateInfo().then(function(response){
        console.log('========点击时间，获取预约号========',response);
        $scope.dateTextInfo=response.data.result;

      },function(response){
        console.log('预约时间信息失败!--'+response);
      })

      $scope.reservationDate=$scope.dateTextInfo[index];
      console.log('预约时间----',$scope.reservationDate);
        
      $scope.dateOptionsInfo=$scope.dateTextInfo[index].am_times;
      $scope.dateOptionsInfo1=$scope.dateTextInfo[index].pm_times;

      $scope.dateChecked.map(function(a,i){
        $scope.dateChecked[i]=0;
      })
       $scope.dateChecked[index]=1;
      console.log($scope.dateChecked);

      //时间段选择，数据初始化
      $scope.dateChoosenArrAM=new Array(4);
      $scope.dateChoosenArrAM=$scope.dateChoosenArrAM.join('0').split('');
      $scope.dateChoosenArrPM=new Array(4);
      $scope.dateChoosenArrPM=$scope.dateChoosenArrPM.join('0').split('');
      
      //初始化页面跳转参数：$scope.reservationTimePass
      $scope.reservationTimePass=null;

    }

    //选择就诊具体时间段
    $scope.timePicker=function(dataInfo){
      $scope.reservationTime=dataInfo.data;
      console.log('预约时间:------',$scope.reservationTime);
      console.log('index:------',dataInfo.index);
      console.log('是否可预约:------',$scope.dateChoosen)
      console.log('预约时间:------',$scope.reservationTime.count);

      $scope.dateChoosenArrAM.map(function(a,i){
        $scope.dateChoosenArrAM[i]=0;
      })
      $scope.dateChoosenArrPM.map(function(a,i){
        $scope.dateChoosenArrPM[i]=0;
      })
      if($scope.dateChoosen&&$scope.reservationTime.count>0&&dataInfo.index<4){
        $scope.dateChoosenArrAM[dataInfo.index]=1;
        $scope.reservationTimePass=$scope.reservationTime;
      }else if($scope.dateChoosen&&$scope.reservationTime.count>0&&dataInfo.index>3){
        $scope.dateChoosenArrPM[dataInfo.index-4]=1;
        $scope.reservationTimePass=$scope.reservationTime;
      }else{
        $scope.reservationTimePass=null;
        during.show('该时间段不可预约，请重新进行选择!')
      }
      console.log($scope.dateChoosenArrAM);
      console.log($scope.dateChoosenArrPM);

    }

    //跳转到病情描述页面 
    $scope.docDetailShow=function () {
      if($scope.reservationTimePass){
        $state.go('airLift.conditionDescription',{data:{
            docName:$scope.docTextInfo,
            date:$scope.reservationDate.date,
            time:$scope.reservationTimePass.time,
            price:$scope.reservationDate.price,
            time_type:$scope.reservationDate.time_type
        }});
      }else{
        during.show('如要继续操作，请选择预约时间!');
      }
      
    };
    
  })

  //过滤器----日期选择
  angular.module('starter')
  .filter("weeksName",function () {
    return function (a) {
      console.log(arguments,'11111111')
      switch (a) {
        case 'Sunday': a='星期天';
          break;
        case 'Monday': a='星期一';
          break;
        case 'Tuesday': a='星期二';
          break;
        case 'Wednesday': a='星期三';
          break;
        case 'Thursday': a='星期四';
          break;
        case 'Friday': a='星期五';
          break;
        case 'Saturday': a='星期六';
          break;
        default:
          break;
      }
      return a;
    }
    })

  //
  angular.module('starter')
  .filter("canMake",function () {
    return function (a) {
      console.log(arguments,'11111111')
      if(!a){
        return '';
      }
      if(a){
        return '坐诊';
      }
    }
    })

  //过滤器----预约挂号，挂号数
  angular.module('starter')
  .filter("countNum",function () {
    return function (a) {
      console.log(arguments,'11111111')
      if(a<0){
        return '不可预约';
      }else if(a==0){
        return '已满';
      }else {
        return '余号'+a+'个';
      }
    }
    })

//过滤器----预约状态
angular.module('starter')
  .filter("resType",function () {
    return function (a) {
      console.log(arguments,'11111111')
      switch (a) {
        case 1: a='普通预约';
          break;
        case 2: a='加急预约';
          break;
        case 3: a='实时预约';
          break;
        case -1: a='不可预约';
          break;
        default:
          break;
      }
      return a;
    }
    })
