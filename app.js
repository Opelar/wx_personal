let Promise = require('./utils/wx.promise');
//app.js
App({
  globalData: {
    userInfo: null, //用户微信个人信息
    openid: null, //用户的openid
    session_key: null, //用户的加解密session_key 后面备用
  },

  onLaunch() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo(cb) {
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    }
    //调用登录接口
    let js_code = null;
    wx.pro.login({})
      .then((login_res) => {
        console.log(login_res.code)
        js_code = login_res.code;
        return wx.pro.getUserInfo({})
      })
      .then((userInfo) => {
        console.log(userInfo.userInfo);
        this.globalData.userInfo = userInfo.userInfo
          //请求微信接口获取openid session_key信息
        return wx.pro.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: "wxd431cf292c173298",
            secret: "0abd4b1baa9f17af2979ff1c20593c9e",
            js_code: js_code,
            grant_type: "authorization_code",

          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        })
      })
      .then((open_res) => {
        console.log(open_res.openid)
        this.globalData.openid = open_res.openid;
        this.globalData.session_key = open_res.session_key;
      })
      .catch((err) => {
        this.globalData.userInfo = null;
        this.globalData.cid = null;
      })

  },

})
