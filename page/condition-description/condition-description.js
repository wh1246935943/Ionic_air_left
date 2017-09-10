  //病情描述
  angular.module('starter')
  .controller('conditionDescriptionCtrl', function($scope,$state,$stateParams,$ionicActionSheet, $timeout,doctorRoom,getFun,during) {
    console.log($stateParams.data,'---------');
    $scope.descriptions={text:''};
    $scope.docInfo=$stateParams.data;
    $scope.PicShow={
      show:false
    };
    $scope.patientNameShow={
      show:false
    };
    $scope.pic={};    
    //reload controller before enter
    $scope.$on("$ionicView.beforeEnter", function(){
       getFun.getMethod(api.url.getFamilyContactsList,{
          token:TOKEN,
          normal_user_id:USER_ID
       }).then(function(response){
          console.log('====reload===='+JSON.stringify(response));
          $scope.patientListInfo=response.data.result;
          $scope.patientNameList=[];
          console.log($scope.patientNameList,'llllll')
          response.data.result.map(function(value){
              $scope.patientNameList.push({
                text:value.name
              })
          })
        })

    });

    $scope.showPicMethod=function () {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '拍照'},
          { text: '从相册选择' }
        ],
        destructiveText: '',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          console.log(index)
          var data='';
          if(index==0){
            data=Camera.PictureSourceType.CAMERA;
            takePhotos(data);

          }else{
            data=Camera.PictureSourceType.PHOTOLIBRARY;
            takePhotos(data);
          }
          function takePhotos(data) {
            navigator.camera.getPicture(function cameraCallback(imageData) {
              // $scope.PicShow.show=true;
              $scope.pic.imgSrc=[imageData];
            }, function errorCallback(error) {}, {
              quality:50,
              destinationType:Camera.DestinationType.FILE_URI,
              sourceType:data,
              // allowEdit:true,
              encodingType:Camera.EncodingType.JPEG
            })
          }
          return true;
        }
      });

      // For example's sake, hide the sheet after two seconds
      $timeout(function() {
        hideSheet();
      }, 5000);
    };

    // 删除图片
    $scope.removePic=function(index){
      console.log('删除某张图片========'+index);
      $scope.pic.imgSrc=[];
      console.log($scope.pic.imgSrc+'删除图片后数组输出====');
    }  

    // 显示患者家庭联系人列表
    $scope.showPatientList = function() {
      console.log($scope.patientNameList,'------')
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: $scope.patientNameList,
        destructiveText: '新增',
        titleText: '',
        cancelText: '取消',
        cancel: function() {

        },
        buttonClicked: function(index,context) {
          console.log(context.text)
          $scope.patientId=$scope.patientListInfo[index].id;
          console.log($scope.patientListInfo[index].id,'已选中')
          $scope.patientName=context.text;
          $scope.patientNameShow.show=true;
          return true;
        },
        destructiveButtonClicked:function(){
          console.log('----新增----');
          $state.go('airLift.addContactsJump');
        }
      });

      // For example's sake, hide the sheet after two seconds
      $timeout(function() {
        hideSheet();
      }, 2000);

    };

    // !! Assumes variable fileURL contains a valid URL to a text file on the device,
    //    for example, cdvfile://localhost/persistent/path/to/file.txt
    $scope.docDetailShow=function () {

      var win = function (r) {
          during.hide();
          during.show('订单提交成功!');
          $state.go('airLift.payment',{
            data:{
                appointsresult:r.response,
                info:$scope.docInfo,
                descriptions:$scope.descriptions.text
            }
          });
      }

      var fail = function (error) {
        during.show('failed...');
          console.log("upload error source " + error.source);
          console.log("upload error target " + error.target);
      }

      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = "img.jpg";
      options.mimeType = "image/jpeg";
      fileURL=$scope.pic.imgSrc;
      var params = {
        normal_user_id:USER_ID,
        doctor_id:$scope.docInfo.docName.id,
        time_type:$scope.docInfo.time_type,
        patient_id:$scope.patientId,
        doctor_work_address_id:$scope.docInfo.docName.addresses[0].id,
        appointment_time:$scope.docInfo.date+' '+$scope.docInfo.time,
        patient_condition:$scope.descriptions.text,
        token:TOKEN
      };
      options.params = params;

      var ft = new MultiFileTransfer();

      if(!params.patient_condition){
        during.show("请描述您的病情。")
      }else if(!fileURL){
        during.show("如要继续操作，请上传病情相关图片")
      }else if(!params.patient_id){
        during.show("请选择就诊人。")
      }else {
        ft.upload(fileURL, encodeURI("http://www.bigbug.tech:8080/hospital-appointment-api/api/appointment_order/create.json"), win, fail, options);
        during.show('数据处理中，请稍后...');

      }

    };
  })

