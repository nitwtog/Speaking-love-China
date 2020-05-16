// miniprogram/pages/dati/dati.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disable: false, 
    score1: '#DEB887',
    score2: '#DEB887',
    score3: '#DEB887',
    score4: '#DEB887',
    showView: false,
    list: {
      index: 1,
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      right: "",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 初始化的接口1 题目为用户的index
    wx.request({
      url: 'https://www.zhouwk.club:10000/questionsByUserID',
      data: {
        userID: app.globalData.openid,
      },
      method: 'get',
      success: function(res) {
        console.log("获取题目成功");
        console.log(res);
        that.setData({
          list: {
            index: res.data.question.index,
            question: res.data.question.question,
            answer1: res.data.question.answerA,
            answer2: res.data.question.answerB,
            answer3: res.data.question.answerC,
            answer4: res.data.question.answerD,
            right: res.data.question.answer,
          },
        })
      },
      fail: function(res) {
        console.log("获取题目失败");
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  },

  wrong: function () {
    var that = this;
    console.log(that.data.list);
    wx.request({
      url: 'https://www.zhouwk.club:10000/erroQuestion',
      data: {
        index: that.data.list.index,
        userID: app.globalData.openid,
      },
      method: 'get',
      success: function (res) {
        console.log("记录错题成功");
      },
      fail: function (res) {
        console.log("记录错题失败");
      }
    })
  },

  dati: function () {
    var that = this;
    that.setData({
      disable: true
    })
    wx.request({
      url: 'https://www.zhouwk.club:10000/increaseIndex',
      data: {
        userID: app.globalData.openid,
      },
      method: 'get',
      success: function (res) {
        console.log("答题成功");
      },
      fail: function (res) {
        console.log("答题失败");
      }
    })
  },

  ans1: function(e) {
    let that = this;
    that.dati();
    if (that.data.list.right == 'A') {
      that.setData({
        score1: '#90EE90',
        score2: 'rgba(252,178,22,0.2)',
        score3: 'rgba(252,178,22,0.2)',
        score4: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'B') {
      that.wrong();
      that.setData({
        score2: '#90EE90',
        score1: '#FFA07A',
        score3: 'rgba(252,178,22,0.2)',
        score4: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'C') {
      that.wrong();
      that.setData({
        score3: '#90EE90',
        score2: 'rgba(252,178,22,0.2)',
        score1: '#FFA07A',
        score4: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'D') {
      that.wrong();
      that.setData({
        score4: '#90EE90',
        score2: 'rgba(252,178,22,0.2)',
        score3: 'rgba(252,178,22,0.2)',
        score1: '#FFA07A',
        showView: true,
      });
    }
  },

  ans2: function(e) {
    let that = this;
    that.dati();
    if (that.data.list.right == 'A') {
      that.wrong();
      that.setData({
        score1: '#90EE90',
        score2: '#FFA07A',
        score3: 'rgba(252,178,22,0.2)',
        score4: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'B') {
      that.setData({
        score2: '#90EE90',
        score1: 'rgba(252,178,22,0.2)',
        score3: 'rgba(252,178,22,0.2)',
        score4: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'C') {
      that.wrong();
      that.setData({
        score3: '#90EE90',
        score1: 'rgba(252,178,22,0.2)',
        score2: '#FFA07A',
        score4: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'D') {
      that.wrong();
      that.setData({
        score4: '#90EE90',
        score1: 'rgba(252,178,22,0.2)',
        score3: 'rgba(252,178,22,0.2)',
        score2: '#FFA07A',
        showView: true,
      });
    }
  },

  ans3: function(e) {
    let that = this;
    that.dati();
    if (that.data.list.right == 'A') {
      that.wrong();
      that.setData({
        score1: '#90EE90',
        score2: 'rgba(252,178,22,0.2)',
        score3: '#FFA07A',
        score4: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'B') {
      that.wrong();
      that.setData({
        score2: '#90EE90',
        score3: '#FFA07A',
        score1: 'rgba(252,178,22,0.2)',
        score4: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'C') {
      that.setData({
        score3: '#90EE90',
        score2: 'rgba(252,178,22,0.2)',
        score1: 'rgba(252,178,22,0.2)',
        score4: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'D') {
      that.wrong();
      that.setData({
        score4: '#90EE90',
        score2: 'rgba(252,178,22,0.2)',
        score1: 'rgba(252,178,22,0.2)',
        score3: '#FFA07A',
        showView: true,
      });
    }
  },

  ans4: function(e) {
    let that = this;
    that.dati();
    if (that.data.list.right == 'A') {
      that.wrong();
      that.setData({
        score1: '#90EE90',
        score2: 'rgba(252,178,22,0.2)',
        score4: '#FFA07A',
        score3: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'B') {
      that.wrong();
      that.setData({
        score2: '#90EE90',
        score4: '#FFA07A',
        score1: 'rgba(252,178,22,0.2)',
        score3: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'C') {
      that.wrong();
      that.setData({
        score3: '#90EE90',
        score2: 'rgba(252,178,22,0.2)',
        score4: '#FFA07A',
        score1: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    } else if (that.data.list.right == 'D') {
      that.setData({
        score4: '#90EE90',
        score2: 'rgba(252,178,22,0.2)',
        score3: 'rgba(252,178,22,0.2)',
        score1: 'rgba(252,178,22,0.2)',
        showView: true,
      });
    }
  },

  back: function(e) {
    wx.showToast({
      title: '你也太优秀了！',
      duration: 1000,
      success: function() {
        setTimeout(function() {
          wx.switchTab({
            url: '../dati/dati',
          })
        }, 2000);
      }
    })
  },

  next: function(e) {
    let that = this;
    wx.request({
      url: 'https://www.zhouwk.club:10000/questionsByUserID',
      data: {
        userID: app.globalData.openid,
      },
      method: 'get',
      success: function(res) {
        that.setData({
          disable: false,
          score1: '#DEB887',
          score2: '#DEB887',
          score3: '#DEB887',
          score4: '#DEB887',
          showView: false,
          list: {
            index: res.data.question.index,
            question: res.data.question.question,
            answer1: res.data.question.answerA,
            answer2: res.data.question.answerB,
            answer3: res.data.question.answerC,
            answer4: res.data.question.answerD,
            right: res.data.question.answer,
          },
        })
      },
      fail: function(res) {
        console.log("获取题目失败");
      }
    })
  }
})