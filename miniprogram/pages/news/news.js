import {
  dbGet,
  dbAdd,
  dbUpload,
  dbDel
} from '../../utils/api';

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
  changeBanner() {
    wx.navigateTo({
      url: '../index/bannerChange/bannerChange?name=news'
    })
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
    dbGet({
      name: 'news',
      loadStart: true
    }).then((data) => {
      this.setData({
        imgUrls: data
      })
    })
    dbGet({
      name: 'newsList',
      loadEnd: true
    }).then((data) => {
      this.setData({
        list: data
      })
    })
  },
  del(e){
    const data = e.currentTarget.dataset
    dbDel({
      name: 'newsList',
      fileId: data.fileid,
      where: data.id,
    }).then(res => {
      this.refurbish()
    })
  },
  goedit(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../editDetail/editDetail?name=newsList&type=news&id=' + id
    })
  }
})