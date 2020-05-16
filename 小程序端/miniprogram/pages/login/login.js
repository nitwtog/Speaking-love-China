var app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    openid: '',
  },

  onLoad: function () {

  },

  onShow: function () {
    this.onGetOpenid();
    this.setData({
      openid: app.globalData.openid
    })
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.isLogin = true;
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      //console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false,
      });

      wx.request({
        url: 'https://www.zhouwk.club:10000/createUser',
        //定义传到后台的数据
        data: {
          //从全局变量data中获取数据
          userID: app.globalData.openid,
          name: e.detail.userInfo.nickName,
          image: e.detail.userInfo.avatarUrl
        },
        method: 'get',//定义传到后台接受的是post方法还是get方法
        success: function (res) {
          console.log("传入信息成功");
          wx.showToast({
            title: '登录成功',
          })
          wx.switchTab({
            url: '/pages/mine/mine',
          })
        },
        fail: function (res) {
          console.log("调用API失败");
          console.log(res)
          wx.showModal({
            title: '提示',
            content: '授权失败！',
            showCancel: false
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  refuse: function(){
    wx.switchTab({
      url: '../mine/mine',
    })
  }
})