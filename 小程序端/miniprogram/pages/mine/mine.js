//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {
      nickName: '点击此处登录'
    },
    logged: false,
    takeSession: false,
    islogin: false,
    requestResult: '',
    myRank: {
      index: 0
    },
    myPaper: 0,
  },

  onLoad: function () {
    var that = this;
    that.setData({
      islogin: app.globalData.isLogin,
    });
    if (that.data.islogin == true) {
      wx.request({
        url: 'https://www.zhouwk.club:10000/checkRank',
        data: {
          userID: app.globalData.openid,
        },
        method: 'get',
        success: function (res) {
          console.log("获取排名成功");
          that.setData({
            myRank: res.data.myrank,
          })
        },
        fail: function (res) {
          console.log("获取排名失败");
        }
      })
      wx.request({
        url: 'https://www.zhouwk.club:10000/MyPaper?userID=' + app.globalData.openid,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log('获取文章成功！')
          that.setData({
            myPaper: res.data.paper.length,
          })
        }
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo
                })
              }
            })
          }
        }
      })
    }
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  //跳转
  openPage: function (a) {
    var that = this;
    if (that.data.islogin) {
      var e = a.currentTarget.dataset.url;
      wx.navigateTo({
        url: e
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录！',
      })
    }
  },

  //弹窗
  popConfirm: function () {
    wx.showModal({
      title: '大声爱国小程序',
      content: '联系邮箱：3017207087@tju.edu.cn。\n联系电话：17725309261',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确认回调')
        } else {
          console.log('点击取消回调')
        }
      }
    });
    wx.showModal({
      title: '大声爱国小程序',
      content: 'Hi~，欢迎使用“大声爱国”,作者：刘汇钰,周玮康,吕曼莹,王思琦,舒雅。',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确认回调')
        } else {
          console.log('点击取消回调')
        }
      }
    });

  },

  login: function () {
    wx.navigateTo({
      url: '../login/login'
    });
  },

  changeData: function () {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },
})