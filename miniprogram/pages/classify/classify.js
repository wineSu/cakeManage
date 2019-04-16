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
      name: 'classify',
      where: options.id
    }).then((data) => {
      this.setData({
        imgUrl: data.url
      })
    })
  },
  refurbish() {
    dbGet({
      name: 'list'
    }).then((data) => {
      console.log(data)
      this.setData({
        listData: data
      })
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refurbish()
  },
  
})