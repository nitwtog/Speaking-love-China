var app = getApp();
Page({
  data: {
    searchKey:"",
    recList:[
    ]
  },
  //获取input文本
  getSearchKey: function (e) {
    this.setData({
      searchKey: e.detail.value,
      //app.globalData.input = this.data.searchKey,
    })
    //console.log(app.input)
  },
  
  btnClick: function (event) {
    var that = this;

    wx.request({
      // url: 'http://129.211.44.111:10000/paper?number_begin=0&number_end=20&userID=' + app.globalData.openid, //接口名称 
      url: 'https://www.zhouwk.club:10000/findPaperByKeywords',
      header: {
        'content-type': 'application/json'       // 默认值（固定，我开发过程中还没有遇到需要修改header的）    

      },
      data: {
        userID: app.globalData.openid,//我的ID
        keyword: this.data.searchKey
    
      },
      success(res) {
        console.log('setData')
        that.setData({
          recList: res.data.paper,
          // whichfirst: that.data.whichfirst + 1,
          // whichlast: that.data.whichlast + 1
        })
      }
    })
    
  },
  goContentDetail(e) {
    wx.navigateTo({
      url: '../../pages/contentDetail/contentDetail?paperID=' + e.target.dataset.agree1 + '&title=' + e.target.dataset.title + '&content=' + e.target.dataset.content + '&agree=' + e.target.dataset.agree + '&haha=' + e.target.dataset.haha + '&dates=' + e.target.dataset.dates + '&name=' + e.target.dataset.name + '&image=' + e.target.dataset.image,
    }),
      console.log(e.target.dataset.haha)

  },
  


  
  //每次显示钩子函数都去读一次本地storage
  onShow: function () {
   
  }
})