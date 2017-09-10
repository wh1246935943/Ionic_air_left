
angular.module('starter', ['ionic', 'starter.services'])
  .run(function ($ionicPlatform, $location, $ionicHistory, $ionicPopup, $rootScope) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
    $ionicPlatform.registerBackButtonAction(function (e) {
      //阻止默认的行为
      e.preventDefault();
      // 退出提示框
      function showConfirm() {
        var servicePopup = $ionicPopup.show({
          title: '提示',
          subTitle: '你确定要退出应用吗？',
          scope: $rootScope,
          buttons: [
            {
              text: '取消',
              type: 'button-clear button-assertive',
              onTap: function () {
                return 'cancel';
              }
            },
            {
              text: '确认',
              type: 'button-clear button-assertive border-left',
              onTap: function (e) {
                return 'active';
              }
            }
          ]
        });
        servicePopup.then(function (res) {
          if (res == 'active') {
            // 退出app
            ionic.Platform.exitApp();
          }
        });
      }

      // 判断当前路由是否为各个导航栏的首页，是的话则显示提示框
      // showConfirm();
      if ($location.path() == '/airLift/homePage' || $location.path() == '/airLift/myService' || $location.path() == '/airLift/account') {
        showConfirm();
      } else if ($ionicHistory.backView()) {
        $ionicHistory.goBack();
      } else {
        showConfirm();
      }
      return false;
    }, 101); //101优先级常用于覆盖‘返回上一个页面’的默认行为
  })
  .directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function() {
          scope.$watch(attributes.hideTabs, function(value){
            $rootScope.hideTabs = value;
          });
        });

        scope.$on('$ionicView.beforeLeave', function() {
          $rootScope.hideTabs = false;
        });
      }
    };
  })

  .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.android.views.transition('android');





    $stateProvider
      // 这里是登陆页面
      .state('login',{
        url:'/login',
        cache: false,
        templateUrl:'templates/login.html',
        controller:'loginCtrl'
      })
      //这里是注册页面
      .state('signIn',{
        url:'/signIn',
        templateUrl:'templates/sign-in.html',
        controller:'signInCtrl'
      })
      //这里是密码重置页面
      .state('reset',{
        url:'/reset',
        templateUrl:'templates/reset.html',
        controller:'resetCtrl'
      })
      .state('airLift.reset-center',{
        url:'/reset-center',
        views: {
          'air-account': {
            templateUrl: 'templates/reset.html',
            controller: 'resetCtrl'
          }
        }
      })
      // setup an abstract state for the tabs directive
      .state('airLift', {
        url: '/airLift',
        // abstract: true,
        templateUrl: 'templates/air-lift.html',
        controller:'airLiftCtrl'
      })

      // Each tab has its own nav history stack:

      .state('airLift.homePage', {
        url: '/homePage',
        views: {
          'air-homePage': {
            templateUrl: 'templates/home-page.html',
            controller: 'homePageCtrl'
          }
        }
      })
      //这里是爱尔诊所页面
      .state('airLift.airClinic',{
        url:'/airClinic',
        views: {
          'air-homePage': {
            templateUrl:'templates/air-clinic.html',
            controller:'airClinicCtrl'
          }
        }
      })
      // .state('airClinic', {
      //   url: '/airClinic',
      //   templateUrl: 'templates/air-clinic.html',
      //   controller: 'airClinicCtrl'
      // })
      //这里是诊室
      .state('airLift.conRoom', {
        url: '/conRoom/:id',
        views: {
          'air-homePage': {
            templateUrl: 'templates/con-room.html',
            controller: 'conRoomCtrl'
          }
        }
      })
      //这里是门诊室
      .state('airLift.patientRoom',{
        url:'/patient-room/:data',
        views: {
          'air-homePage': {
            templateUrl:'templates/patient-room.html',
            controller:'patientRoomCtrl'
          }
        }
      })
      //医生详情
      .state('airLift.docDetails',{
        url:'/doc-details',
        views: {
          'air-homePage': {
            templateUrl:'templates/doc-details.html',
            controller:'docDetailsCtrl'
          }
        }
      })
      //病情描述
      .state('airLift.conditionDescription',{
        url:'/condition-description',
        // cache: false,
        views: {
          'air-homePage': {
            templateUrl:'templates/condition-description.html',
            controller:'conditionDescriptionCtrl',

          }
        },
        params:{
          data:{},
          event:{}
        }
      })
      //支付
      .state('airLift.payment',{
        url:'/payment',
        views: {
          'air-homePage': {
            templateUrl:'templates/payment.html',
            controller:'paymentCtrl'
          }
        },
        params:{
          data:{},
          event:{}
        }
      })
      //这是我的服务页面
      .state('airLift.myService', {
        url: '/myService',
        views: {
          'air-myService': {
            templateUrl: 'templates/my-service.html',
            controller: 'myServiceCtrl'
          }
        }
      })
      .state('airLift.chat-detail', {
        url: '/myService/:chatId',
        views: {
          'air-myService': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('airLift.account', {
        url: '/account',
        cache: false,
        views: {
          'air-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'accountCtrl'
          }
        }
      })
      .state('airLift.personalInfo', {
        url: '/personalInfo',
        views: {
          'air-account': {
            templateUrl: 'templates/personal-info.html',
            controller: 'personalInfoCtrl'
          }
        }
      })
      .state('airLift.modifyPassword', {
        url: '/modifyPassword',
        views: {
          'air-account': {
            templateUrl: 'templates/modify-password.html',
            // controller: 'modifyPasswordCtrl'
          }
        }
      })
      .state('airLift.myAppointment', {
        url: '/myAppointment',
        views: {
          'air-account': {
            templateUrl: 'templates/my-appointment.html',
            controller: 'myAppointmentCtrl'
          }
        }
      })
      .state('airLift.familyContacts', {
        url: '/familyContacts',
        cache: false,
        views: {
          'air-account': {
            templateUrl: 'templates/family-contacts.html',
            controller: 'familyContactsCtrl'
          }
        }
      })
      .state('airLift.addContacts', {
        url: '/addContacts',
        views: {
          'air-account': {
            templateUrl: 'templates/add-contacts.html',
            controller: 'addContactsCtrl'
          }
        }
      })
      //病情描述页面，选择联系人页面跳转
      .state('airLift.addContactsJump', {
        url: '/addContactsJump',
        views: {
          'air-homePage': {
            templateUrl: 'templates/add-contacts.html',
            controller: 'addContactsCtrl'
          }
        }
      })
      .state('airLift.reviseContacts', {
        url: '/reviseContacts',
        params:{
          data:{}
        },
        views: {
          'air-account': {
            templateUrl: 'templates/revise-contacts.html',
            controller: 'reviseContactsCtrl'
          }
        }
      })
      .state('airLift.clinicSite',{
        url:'/clinicSite/:latLonData',
        views:{
          'air-homePage':{
            templateUrl:'templates/clinic-site.html',
            controller:'clinicSiteCtrl'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/airLift/doc-details');//    /airLift/homePage

  });
