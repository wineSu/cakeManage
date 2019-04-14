import { dbGet, dbAdd, dbUpload, dbDel } from '../../../utils/api';

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
      name: 'banner'
    }).then((data) => {
      this.setData({
        imgUrls: data
      })
    })
  },
  add(e){
    dbUpload({
      name: 'banner'
    }).then(res=>{
      this.refurbish()
    })
  },
  del(e){
    const data = e.currentTarget.dataset
    dbDel({
      name: 'banner',
      fileId: data.fileid,
      where: data.id,
    }).then(res => {
      this.refurbish()
    })
  },
  change(e){
    const data = e.currentTarget.dataset
    dbUpload({
      name: 'banner',
      fileId: data.fileid,
      where: data.id,
    }).then(res => {
      this.refurbish()
    })
  }
})