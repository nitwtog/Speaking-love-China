var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    questionTitle: '',
    contentDetail: '',
    like: 0,
    dates: "",
    // haschange:'false',
    hasChange: false,
    //show:false
    favor_img: "../../images/dianzan.jpg",
    favor_img2: "../../images/dianzan2.jpg"
  },

  praiseThis: function(e) {
    var that = this;
    if (app.globalData.isLogin) {
      //if(that.data.haschange)
      var hasChange = that.data.hasChange;
      //var show = Boolean(that.data.show);

      if (hasChange !== undefined) {

        var onum = parseInt(that.data.like);
        console.log(hasChange);
        if (hasChange == 'true') {
          //console.log("1");
          that.data.like = (onum - 1);
          //console.log(that.data.like);
          that.data.hasChange = 'false';
          that.data.show = false;
          //console.log(that.data.like);
        } else {
          // console.log("yes");
          //console.log(hasChange);
          that.data.like = (onum + 1);
          //  console.log(that.data.like);
          that.data.hasChange = 'true';
          that.data.show = true;
          //  console.log("2");
        }
        this.setData({
          like: that.data.like,
          hasChange: that.data.hasChange,
          show: that.data.show
        })
      };
      wx.request({
        url: 'https://www.zhouwk.club:10000/agree',
        //定义传到后台的数据
        data: {
          // like: this.data.like,//更改后点赞数
          // hasChange: this.data.hasChange,//是否给文章点过赞，true/false

          userID: app.globalData.openid, //我的ID
          paperID: this.data.id //文章ID
        },
        method: 'get', //定义传到后台接受的是post方法还是get方法
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        success: function(res) {
          console.log("成功");

        },
        fail: function(res) {
          console.log("失败");
        }


      });
      var pages = getCurrentPages(); //当前页面栈
      if (pages.length > 1) {
        var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
        beforePage.changeData(); //触发父页面中的方法
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录！',
      })
    }
  },
  onLoad: function(option) {
    var that = this;
    this.setData({
      id: option.paperID,
      questionTitle: option.title,
      contentDetail: option.content,
      like: option.agree,
      hasChange: option.haha,
      image: option.image,
      name: option.name,
      dates: option.dates
    });
    //console.log(this.data.hasChange)
    if (that.data.hasChange == 'true') {
      //console.log("1")
      that.data.show = true
      //  console.log(.data.show)
    } else {
      that.data.show = false
    };
    this.setData({
      show: that.data.show
    })
    // console.log(option.haha)



  },

  /**
   * 生命周期函数--监听页面加载
   */


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

  }
})