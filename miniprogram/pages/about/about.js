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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dbGet({
      name: 'about',
      loadStart: true,
      loadEnd: true
    }).then((data) => {
      this.setData({
        dataall: data[0]
      })
    })
  },

  onShow: function () {

  },

  
})