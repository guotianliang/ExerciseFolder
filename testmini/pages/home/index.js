import $ from '../../utils/Tool'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    chartDate:[
      {name:"13:00",value:23,min:20,max:25},
      {name:"14:00",value:23,min:20,max:25},
      {name:"15:00",value:23,min:20,max:25},
    ],
    axisYmin:0,
    axisYmax:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log($)
    // $.loading()
    // $.hideLoading()
    /**
     * 1.确定Y轴比例
     * 2.确定Y轴渲染数据
     * 3.确定X轴渲染数据
     * 
     */ 
  },
  onChange:function(e){
    console.log(e);
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
  chooseVideo(){
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 15,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
      }
    })
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
    return {
      title: `大家好`,
      path: `/pages/home/home`,
      imageUrl: './../../images/loading.png'
    }
  }
})