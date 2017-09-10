var URLDATA='http://www.bigbug.tech:8080/hospital-appointment-api/api/';

USER_ID=localStorage.getItem("id");

TOKEN = localStorage.getItem('token');

api={
  url:{
    getDocList:URLDATA+'doctor/speciality_of_hospital.json',//获取医生list
    getDocDetail:URLDATA+'doctor/show.json',//获取医生详情
    getDateInfo:URLDATA+'doctor/available_appointment.json',//获取预约时间
    getPatientInfo:URLDATA+'patient/normal_user.json',//获取病人列表
    payBill:URLDATA+'pingpp/charge_appointment.json',//支付预约订单
    signInGetVerCode:URLDATA+'sms/send_register_code.json',//注册页面获取验证码
    signIn:URLDATA+'normal_user/register.json',//注册手机号
    login:URLDATA+'normal_user/authenticate.json',//登陆账号
    changPasswordVerCode:URLDATA+'sms/send_change_password_code.json',//重置密码页面获取验证码
    changPassword:URLDATA+'normal_user/change_password.json',//重置密码
    doctorAllianceRecommend:URLDATA+'doctor/big_hospital_recommend.json',//主页面名医联盟推荐列表
    getAllHospital:URLDATA+'hospital/all.json',//获取所有医院
    getNameList:URLDATA+'patient/normal_user.json',//个人信息
    getPersonalInfoList:URLDATA+'normal_user/show.json',//编辑个人信息
    getClinicPar:URLDATA+'hospital/show.json',//获取医院详情
    myService:URLDATA+'service/normal_user_confirmed.json',//我的服务中获取某个已确认的服务
    getFamilyContactsList:URLDATA+'patient/normal_user.json',//获取家庭联系人
    getAddContactsList:URLDATA+'patient/add.json',//添加家庭联系人
    getRushContactsList:URLDATA+'normal_user/update.json',//刷新家庭联系人
    getUnconfirmed:URLDATA+'appointment_service/normal_user_unconfirmed.json',//我的服务中获取某个未确认的服务
    getNonPayment:URLDATA+'appointment_order/normal_user_unpaid.json',//我的服务中获取某个用户未支付的订单
    getReviseContactsList:URLDATA+'patient/update.json',//刷新家庭联系人
    getDeleteContactsList:URLDATA+'patient/remove.json',//删除家庭联系人
    getPayContactsList:URLDATA+'appointment_order/normal_user_paid.json',//获取支付信息
    getNotPayContactsList:URLDATA+'appointment_order/normal_user_unpaid.json'//获取未支付信息
  }
}

angular.module('starter.services',[])
