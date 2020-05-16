//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    ifsuccess:'0',
    mineMap: {},
    sideLength: 5,
    mineNum: 3,
    remainMineNum: 3,
    cleanMineNum: 0,
    timesGo: 0,
    timeInterval: null,
  },
  //开始
  onLoad: function () {
    this.drawMineField()
    this.timeGoClock()
  },
  //重新开始
  restart: function(){
    this.setData({
      ifsuccess:'0',
      sideLength: 5,
      mineNum: 3,
      remainMineNum: 3,
      cleanMineNum: 0,
      timesGo: 0,
    })
    this.drawMineField()
    this.timeGoReset()
    this.timeGoClock()
  },
  // 生成地图
  drawMineField: function(){
    var square = this.blankSquare(this.data.sideLength)
    square = this.writeInMine(square, this.data.mineNum)
    square = this.markedSquare(square)
    square = this.formatMineField(square)
    this.setData({
      mineMap: square
    })
    // console.log('square', this.data.mineMap)
  },
  // 格式化数组地图
  formatMineField: function (array){
    var square = this.clonedSquare(array)

    for (let i = 0; i < array.length; i++){
      for (let j = 0; j < array[i].length; j++){
        square[i][j] = {
                          'value': array[i][j],
                          'flag':false,
                          'open':false,
                        }
      }
    }
    return square


  },
  // 复制一个 square
  clonedSquare: function (array) {
    var s = []
    for (var i = 0; i < array.length; i++) {
      var line = []
      for (var j = 0; j < array[i].length; j++) {
        line.push(array[i][j])
      }
      s.push(line)
    }
    return s
  },

  //构建空行
  blankLine: function (n) {
    var l = []
    for (var i = 0; i < n; i++) {
      l.push(0)
    }
    return l
  },

  // 生成空数组
  blankSquare: function (n) {
    var square = []
    for (var i = 0; i < n; i++) {
      var line = this.blankLine(n)
      square.push(line)
    }
    return square
  },

  // 给出地雷数量让后随机写入地雷
  writeInMine: function (array, num) {
    var square = this.clonedSquare(array)
    var r = square.length
    // 随机位置写入
    var randomLocation = function () {
      var x = Math.floor(Math.random() * r)
      var y = Math.floor(Math.random() * r)
      // console.log( ':', x, y);
      if (square[x][y] !== 9) {
        square[x][y] = 9
      } else {
        randomLocation()
      }
    }
    for (var i = 0; i < num; i++) {
      randomLocation()
    }
    return square
  },

  // 辅助函数, 给数字 +1
  // 这里会判断下标是否合法
  plus1: function (array, x, y) {
    var n = array.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
      if (array[x][y] !== 9) {
        array[x][y] += 1
      }
    }
  },

  // 辅助函数, 用来给 9 周边的 8 个格子 +1
  markAround: function (array, x, y) {
    /*
    ###
    #+#
    ###
    */
    if (array[x][y] === 9) {
      // 左边 3 个
      this.plus1(array, x - 1, y - 1)
      this.plus1(array, x - 1, y)
      this.plus1(array, x - 1, y + 1)
      // 上下 2 个
      this.plus1(array, x, y - 1)
      this.plus1(array, x, y + 1)
      // 右边 3 个
      this.plus1(array, x + 1, y - 1)
      this.plus1(array, x + 1, y)
      this.plus1(array, x + 1, y + 1)
    }
  },

  //标记数组雷的数量
  markedSquare: function (array) {
    /*
    array 是一个「包含了『只包含了 0 9 的 array』的 array」
    返回一个标记过的 array
    ** 注意, 使用一个新数组来存储结果, 不要直接修改老数组

    范例如下, 这是 array
    [
        [0, 9, 0, 0],
        [0, 0, 9, 0],
        [9, 0, 9, 0],
        [0, 9, 0, 0],
    ]

    这是标记后的结果
    [
        [1, 9, 2, 1],
        [2, 4, 9, 2],
        [9, 4, 9, 2],
        [2, 9, 2, 1],
    ]

    规则是, 0 会被设置为四周 8 个元素中 9 的数量
    */
    var square = this.clonedSquare(array)
    for (var i = 0; i < square.length; i++) {
      var line = square[i]
      for (var j = 0; j < line.length; j++) {
        this.markAround(square, i, j)
      }
    }
    return square
  },
  //扫雷
  demining: function (event) {
    // console.log(this.data.ifsuccess)
    
    var x = parseInt(event.currentTarget.dataset.x)
    var y = parseInt(event.currentTarget.dataset.y)
    var value = parseInt(event.currentTarget.dataset.value)
    // console.log('x', x)
    // console.log('y', y)
    // console.log('value', value)
    if (value < 0) return;
    if (value != 9 && this.data.mineMap[x][y].open == false){
      this.data.mineMap[x][y].open = true
      // console.log('demining mineMap', this.data.mineMap)
      this.setData({
        mineMap: this.data.mineMap
      })
      if(value == 0){
        this.showNoMine(x, y)
      }
      this.data.cleanMineNum++
      this.checkSuccess()
    } else if (value == 9 && this.data.ifsuccess == '0'){
      this.failed()
      this.timeGoStop()
    }

  },
  //插旗
  pullUpFlag:function(event) {
    // console.log('pullUpFlag', event)
    var x = parseInt(event.currentTarget.dataset.x)
    var y = parseInt(event.currentTarget.dataset.y)
    var value = parseInt(event.currentTarget.dataset.value)
    if (this.data.mineMap[x][y].flag == true){
      this.data.mineMap[x][y].flag = false
      this.data.remainMineNum++
    }else{
      this.data.mineMap[x][y].flag = true
      this.data.remainMineNum--
    }
    this.setData({
      mineMap: this.data.mineMap,
      remainMineNum: this.data.remainMineNum,
    })
  },
  //显示全部
  showAll: function(){
    var square = this.data.mineMap
    for (let i = 0; i < square.length; i++) {
      for (let j = 0; j < square[i].length; j++) {
        square[i][j].open = true
      }
    }
    this.setData({
      mineMap: square
    })
  },


  //显示空白的格子
  showWhite: function (x, y) {
    var side_length = this.data.sideLength
    var square = this.data.mineMap
    if (x < side_length && y < side_length && x >= 0 && y >= 0) {
      var item = square[x][y]
      if (!item.open && item.value == 0) {
        square[x][y].open = true
        this.setData({
          mineMap: square
        })
        this.data.cleanMineNum++
        this.checkSuccess()
        this.showNoMine(x, y)
      }
    }
  },

//显示周边8个位置无雷的格子
  showNoMine: function (x, y) {
    this.showWhite(x - 1, y + 1)
    this.showWhite(x - 1, y - 1)
    this.showWhite(x - 1, y)
    this.showWhite(x + 1, y + 1)
    this.showWhite(x + 1, y - 1)
    this.showWhite(x + 1, y)
    this.showWhite(x, y + 1)
    this.showWhite(x, y - 1)
  },

  //判断是否成功
  checkSuccess: function () {
    if (this.data.cleanMineNum == this.data.sideLength * this.data.sideLength - this.data.mineNum) {
      this.success()
      this.timeGoStop()
      this.addRecord()
    }
  },

  //开始计时
  timeGoClock: function () {
    var self = this;
    this.timeInterval = setInterval(function () {

      self.data.timesGo = self.data.timesGo + 1;
      self.setData({ timesGo: self.data.timesGo });

    }, 1000);
  },

  // 停止计时
  timeGoStop: function () {

    clearInterval(this.timeInterval);
  },

  //时间重置
  timeGoReset: function () {
    clearInterval(this.timeInterval);
    this.data.selftimesGo = 0;
    this.setData({ timesGo: this.data.timesGo });
  },
  
  //失败
  failed: function () {
    wx.showToast({
      title: '完了鸭...',
      icon: 'none',
      mask: true,
      duration: 3000
    })
    this.showAll()
  },

  //成功
  success: function () {
    this.setData({ ifsuccess: '1' });
    wx.showToast({
      title: '恭喜你！',
      icon: 'none',
      mask: true,
      duration: 3000
    })
    // this.showAll()
  },

  //添加记录
  addRecord: function(){
    const db = wx.cloud.database()
    db.collection('winer').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        time: this.data.timesGo,
        date: util.getNowFormatDate(),
        status: true
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },

  
})
