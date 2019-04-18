import { dbGet, dbAdd, dbUpload, dbDel } from '../../../utils/api';
let name = 'banner'
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
    if(options.name){
      name = 'news'
    }
    this.refurbish()
  },
  refurbish(){
    dbGet({
      name
    }).then((data) => {
      this.setData({
        imgUrls: data
      })
    })
  },
  add(e){
    dbUpload({
      name
    }).then(res=>{
      this.refurbish()
    })
  },
  del(e){
    const data = e.currentTarget.dataset
    dbDel({
      name,
      fileId: data.fileid,
      doc: data.id,
    }).then(res => {
      this.refurbish()
    })
  },
  change(e){
    const data = e.currentTarget.dataset
    dbUpload({
      name,
      fileId: data.fileid,
      doc: data.id,
    }).then(res => {
      this.refurbish()
    })
  }
})