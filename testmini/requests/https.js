import $ from "../utils/Tool.js"
const API_BASE_URL = "https://duoduoenv.sagacloud.cn";
function get(url, data = {}){
  data = Object.assign(data, {
    pubname: "sagacare"
  });
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: 'GET',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: function success(request) {
        resolve(request.data);
      },
      fail: function fail(error) {
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        reject(error);
      },
      complete: function complete() {
      }
    });
  });
}

function post(url, data = {}) {
  var _url = API_BASE_URL + url;
  data = Object.assign(data, {
    openid:$.storage.get('openId')
  })
  _url = _url + `?pubname=sagacare&openid=${$.storage.get('openId')}`
  if (data.flag) {
    _url = _url + `&flag=${data.flag}`
  }
  return new Promise(function (resolve, reject) {
    wx.request({
      url: _url,
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: function success(request) {
        resolve(request.data);
      },
      fail: function fail(error) {
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        reject(error);
      },
      complete: function complete() {
      }
    });
  });
};
module.exports = {
  http:{get,post}
}