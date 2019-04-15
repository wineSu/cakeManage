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
      if (data[0]){
        this.setData({
          recommend: data[0]
        })
      }
    })

    dbGet({
      name: 'cakes'
    }).then((data)=>{
      this.setData({
        cakes: data
      })
    })

    dbGet({
      name: 'coffe'
    }).then((data) => {
      this.setData({
        coffe: data
      })
    })

    dbGet({
      name: 'food',
      loadEnd: true
    }).then((data) => {
      this.setData({
        food: data
      })
    })
  },
  changeBanner(){
    wx.navigateTo({
      url: 'bannerChange/bannerChange'
    })
  },
  changeTehui(){
    let id = ''
    if (this.data.recommend){
      id = this.data.recommend._id
    }
    wx.navigateTo({
      url: '../editDetail/editDetail?name=recommend&id='+id
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