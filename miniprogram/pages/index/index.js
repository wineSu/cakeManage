import { dbGet } from '../../utils/api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    dbGet({
      name: 'banner',
      loadStart: true
    }).then((data)=>{
      this.setData({
        imgUrls: data
      })
    })

    dbGet({
      name: 'recommend'
    }).then((data)=>{
      this.setData({
        recommend: data[0]
      })
    })

    dbGet({
      name: 'indexList',
      loadEnd: true
    }).then((data)=>{
      this.setData({
        list: data[0]
      })
    })
  },
  changeBanner(){
    wx.navigateTo({
      url: 'bannerChange/bannerChange'
    })
  },
  changeTehui(){
    wx.navigateTo({
      url: '../editDetail/editDetail?name=recommend'
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
    
  }
})