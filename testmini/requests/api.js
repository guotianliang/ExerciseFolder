import {http} from './https'

function getopenId(code){
  return http.get('/duoduo-service/wechat-service/wechat/app/getOpenId','GET',{code:code})
}

function getuserPhone(data){
  return  http.get('/duoduo-service/wechat-service/wechat/app/getUserInfo','GET',data)
}

function userCheck(data){
  return  http.get('/server/user/check','GET',data)
}

function userSave(data){
  return http.post('/server/user/save','POST',data)
}

function userQuery(data){
  return http.post('/server/user/query','POST',data)
}

function userUpdate(data){
  return http.post('/server/user/update','POST',data)
}

function followRoom(data){
  return http.post('/server/space/subscribe','POST',data)
}

function unfollowRoom(data){
  return http.post('/server/space/unsubscribe','POST',data)
}

function spaceProperty(data){
  return  http.get('/server/custom/spaceProperty','GET',data)
}

function queryChart(data){
  return  http.get('/server/space/queryPeriodData','GET',data)
}

function queryAllspace(data){
  return http.post('/server/space/queryAll','POST',data)
}

function queryFollowspace(data){
  return http.post('/server/space/querySubscribe','POST',data)
}

function queryRotation(data){
  return http.post('/server/space/rotation','POST',data)
}

function powerCheck(data){
  return http.post('/server/custom/check','POST',data)
}

function workLeave(data){
  return http.post('/server/custom/leave','POST',data)
}

function nextOpen(data){
  return http.post('/server/custom/nextOpenTime','POST',data)
}

function getfeedBack(data){
  return http.post('/server/custom/feedback','POST',data)
}

function getSpacedetail(data){
  return http.post('/server/space/property','POST',data)
}

function openSpace(data){
  return http.post('/server/custom/recover','POST',data)
}

function getEquipmentAction(data){
  return http.post('/server/custom/getEquipmentAction','POST',data)
}
module.exports = {
  getopenId, // 获取到openId
  getuserPhone, // 获取用户电话
  userCheck, // 检查用户是否注册
  userSave, // 创建用户
  userQuery, // 查询用户
  userUpdate, // 更新用户
  followRoom, // 关注空间
  unfollowRoom, // 取消关注
  spaceProperty,// 空间当前状态
  queryChart,  // 查询空间温度曲线
  queryAllspace, //查询所有空间列表
  queryFollowspace, //查询所有关注列表
  powerCheck, // 查询是否有调节权限
  queryRotation, // 查询轮播图
  workLeave, //  下班节能
  nextOpen, // 下次开启时间
  getfeedBack, // 反馈
  getSpacedetail, // 查询空间信息
  openSpace, // 下班后开启调节
  getEquipmentAction // 查询反馈后设备动作
}