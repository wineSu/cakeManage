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
    imgUrls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  refurbish() {
    dbGet({
      name: 'classify'
    }).then((data) => {
      this.setData({
        imgUrls: data
      })
    })
  },
  goList(e){
    const id = e.currentTarget.dataset.id
    const name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../classify/classify?id=' + id + '&name=' + name,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refurbish()
  },
  add(){
    //新增分类
    dbUpload({
      name: 'classify'
    }).then(res => {
      this.refurbish()
    })
  },
  del(e) {
    const data = e.currentTarget.dataset
    dbDel({
      name: 'classify',
      fileId: data.fileid,
      where: data.id,
    }).then(res => {
      this.refurbish()
    })
  },
  change(e) {
    const data = e.currentTarget.dataset
    dbUpload({
      name: 'classify',
      fileId: data.fileid,
      where: data.id,
    }).then(res => {
      this.refurbish()
    })
  }
  
})