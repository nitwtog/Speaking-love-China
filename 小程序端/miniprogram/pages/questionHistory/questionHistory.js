const app = getApp()

Page({
  
  data: {
    list:[]
  },
  
  onLoad: function (options) {
    var that = this;
    // 页面渲染完成
    wx.request({
      url: 'https://www.zhouwk.club:10000/myError',
      data: {
        userID: app.globalData.openid,
      },
      method: 'get',
      success: function (res) {
        console.log("获取错题成功");
        that.setData({
          list: res.data.error,
        })
      },
      fail: function (res) {
        console.log("获取错题失败");
      }
    })
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
  
  checkAnswer: function(e){
    // console.log(e.currentTarget.dataset.index);
    var that = this;
    var index = e.currentTarget.dataset.index;
    var lists = that.data.list;
    lists[index].ckeck = that.data.list[index].answer
    that.setData({
      list: lists,
    })
  }
})
