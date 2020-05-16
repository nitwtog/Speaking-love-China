// pages/wechat/wechat.js
var app = getApp()
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    whichfirst: 0,
    whichlast: 5,
    isActive: 0,
    // list: ['苹果', '香蕉', '西瓜'],
    recList: [],
    myList: []
  },
  goContentDetail(e) {
    wx.navigateTo({
        url: '../../pages/contentDetail/contentDetail?paperID=' + e.target.dataset.agree1 + '&title=' + e.target.dataset.title + '&content=' + e.target.dataset.content + '&agree=' + e.target.dataset.agree + '&haha=' + e.target.dataset.haha + '&dates=' + e.target.dataset.dates + '&name=' + e.target.dataset.name + '&image=' + e.target.dataset.image,
      }),
      console.log(e.target.dataset.haha)

  },
  //
  setActive: function(e) {

    // 获取当前点击的index
    var index = e.target.dataset.index;
    // 初始化动画数据
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0
    })
    // 距离左边位置
    animation.left((index * 400) + 'rpx').step()
    // 设置动画
    this.setData({
      animationData: animation.export()
    })
    // 设置对应class
    this.setData({
      isActive: index
    })
  },

  getList(flag) {
    var that = this;

    wx.request({
      // url: 'http://129.211.44.111:10000/paper?number_begin=0&number_end=20&userID=' + app.globalData.openid, //接口名称 
      url: 'https://www.zhouwk.club:10000/paper?number_begin=' + that.data.whichfirst + '&number_end=' + that.data.whichlast + '&userID=' + app.globalData.openid,
      header: {
        'content-type': 'application/json' // 默认值（固定，我开发过程中还没有遇到需要修改header的）    

      },

      success(res) {
        console.log('setData')
        that.setData({
          recList: res.data.paper,
          whichfirst: that.data.whichfirst + 5,
          whichlast: that.data.whichlast + 5
        })
      }
    })


  },
  //获取我的文章
  getMyList(flag) {
    var that = this;
    wx.request({
      url: 'https://www.zhouwk.club:10000/MyPaper?userID=' + app.globalData.openid,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('setData')
        that.setData({
          myList: res.data.paper,

        })
      }
    })
  },
  //删除
  deleteIt(flag) {
    var that = this;
    wx.request({
      // url: 'http://129.211.44.111:10000/paper?number_begin=0&number_end=20&userID=' + app.globalData.openid, //接口名称 
      url: 'https://www.zhouwk.club:10000/DeletePaper?paperID=' + flag.target.dataset.paperid + '&userID=' + app.globalData.openid,
      header: {
        'content-type': 'application/json' // 默认值（固定，我开发过程中还没有遇到需要修改header的）    

      },

      success: function(res) {
        console.log(res.data);
        wx.navigateTo({
            url: '../../pages/wechat/wechat'
          }),
          wx.showToast({
            title: '已删除',
          })
      },
    })
    var that = this;
    that.setData({
      whichfirst: 0,
      whichlast: 5
    })
    this.getList();
    this.getMyList();
  },

  toPush(e) {
    var that = this;
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: '../../pages/push/push'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录！',
      })
    }
  },

  judge: function() {
    var that = this;
    if (!app.globalData.isLogin) {
      wx.showModal({
        title: '提示',
        content: '请先登录！',
      })
    }
  },
  getMoreRecList() {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://www.zhouwk.club:10000/paper?number_begin=' + that.data.whichfirst + '&number_end=' + that.data.whichlast + '&userID=' + app.globalData.openid,
      header: {
        'content-type': 'application/json' // 默认值（固定，我开发过程中还没有遇到需要修改header的）    

      },

      success(res) {
        wx.hideLoading()
        that.setData({
          recList: that.data.recList.concat(res.data.paper),
          whichfirst: that.data.whichfirst + 5,
          whichlast: that.data.whichlast + 5
        })
      }
    })


  },
  shuaxin() {
    var that = this;
    that.setData({
      whichfirst: 0,
      whichlast: 5
    })
    this.getList();
    this.getMyList();
  },

  changeData: function() {
    var that = this;
    that.setData({
      whichfirst: 0,
      whichlast: 5
    })
    this.getList();
    this.getMyList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getList();
    this.getMyList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();

    this.getList(true);
    this.getMyList(true);


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})