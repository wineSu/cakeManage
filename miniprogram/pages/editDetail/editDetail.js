import { 
  dbGet,
  dbAdd,
  dbUpload
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
    this.refurbish()
  },
  refurbish(){
    dbGet({
      name: 'recommend'
    }).then((data) => {
      this.setData({
        recommend: data[0]
      })
    })
  },
  change(e){
    const data = e.currentTarget.dataset
    dbUpload({
      name: 'recommend',
      fileId:data.fileid,
      where: data.id,
    }).then(res => {
      this.refurbish()
    })
  },
  save(e){
    const data = e.currentTarget.dataset
    dbAdd({
      name: 'recommend',
      where: data.id,
      data:{
        price:111111111
      }
    }).then(res => {
      this.refurbish()
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