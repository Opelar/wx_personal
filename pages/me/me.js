const user = {
  avatarUrl: "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJRFQ7yM1HfvB3z77jrEWtjqTGuAo6HiaiaAJ0jia8UWLBqvc0SiaFR8AWR08HgUNb6lsyGW210OYcYqw/0",
  city: "",
  country: "CN",
  gender: 1,
  language: "zh_CN",
  nickName: "见贤思齐",
  province: "Beijing"
}

Page({
  data: {
    userInfo: null
  },

  onReady(e) {

  },

  onLoad() {
    let app = getApp();
    let that = this;
    app.getUserInfo(userInfo => {
      console.log(userInfo);
    });
    wx.getUserInfo({
      success: (res) => {
        console.log(res.userInfo);
        that.setData({
          userInfo: res.userInfo  
        })
      }
    })
  }
})