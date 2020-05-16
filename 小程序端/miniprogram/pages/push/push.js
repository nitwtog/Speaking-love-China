//获取应用实例
var app = getApp()
Page({
  data: {
    title: '',
    content: ''
    // theTitle: '',
    // theContent: ''
  },
  //用户名和密码输入框事件
  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  //设置参数值，要使用this.setData({}）方法
  loginBtnClick: function () {
    if (this.data.title.length == 0 || this.data.content.length == 0) {
      // this.setData({
      //  infoMess: '温馨提示：用户名和密码不能为空！',
      // })
      wx.showToast({
        title: '标题和内容不能为空',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      wx.request({
        url: "https://www.zhouwk.club:10000/insertPaper",
        method: "POST",
        data: {
          userID: app.globalData.openid,//我的ID
          // title:"hh"
          title: this.data.title,
          content: this.data.content
          // answer: JSON.stringify(this.data.answer),
          // score: _score,
          // pjid: this.data.pj.pjid,
          // testpaperid: this.data.pj.testpaperid,
          // student: JSON.stringify(this.data.student),
          // message: this.data.message
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res.data);
          wx.showToast({
            title: '发布成功',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1  //小程序关闭当前页面返回上一页面
                })
              }, 500);
            }
          })
        },
      })
    }
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.changeData();//触发父页面中的方法
    }
    console.log(this.data);
  },
  //重置按钮点击事件
  // resetBtnClick: function (e) {
  //   this.setData({
  //     infoMess: '',
  //     userName: '',
  //     userN: '',
  //     passWd: '',
  //     passW: '',
  //   })
  // },
  onLoad: function () {
    // console.log('onLoad')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  }
})