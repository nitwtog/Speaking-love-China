// miniprogram/pages/dati/dati.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  rank: function (e) {
    var that = this;
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: '../rank/rank',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录！',
      })
    }
  },

  beginAnswer: function(e){
    var that = this;
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: '../question/question',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录！',
      })
    }
  },

  history: function(e){
    var that = this;
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: '../questionHistory/questionHistory',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录！',
      })
    }
  }
})