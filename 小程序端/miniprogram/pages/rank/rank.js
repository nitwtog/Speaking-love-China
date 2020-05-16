// pages/leftSwiperDel/index.js
var app = getApp()

Page({
  data: {
    icon: [
      {
        rank: "../../images/0.jpg",
      },
      {
        rank: "../../images/1.jpg",
      },
      {
        rank: "../../images/2.jpg",
      },
      {
        rank: "../../images/3.jpg",
      },
      {
        rank: "../../images/4.jpg",
      },
      {
        rank: "../../images/5.jpg",
      },
      {
        rank: "../../images/6.jpg",
      },
      {
        rank: "../../images/7.jpg",
      },
      {
        rank: "../../images/8.jpg",
      },
      {
        rank: "../../images/9.jpg",
      },
    ],
    list: [],
    myRank: {},
  },
  onLoad: function (options) {
    // 页面渲染完成
    var that = this;
    wx.request({
      url: 'https://www.zhouwk.club:10000/checkRank',
      data: {
        userID: app.globalData.openid,
      },
      method: 'get',
      success: function (res) {
        console.log("获取排名成功");
        console.log(res.data.myrank)
        that.setData({
          list: res.data.paper,
          myRank: res.data.myrank,
        })
      },
      fail: function (res) {
        console.log("获取排名失败");
      }
    })
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.changeData();//触发父页面中的方法
    }
  },

  onReady: function () {
    // 页面渲染完成
  },

  onShow: function () {
    // 页面显示
  },

  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭
  },

})