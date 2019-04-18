import {
  dbGet,
  dbAdd,
  dbUpload,
  dbDel,
  _
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
    this.setData({
      parid: options.id
    })
    dbGet({
      name: 'classify',
      doc: options.id
    }).then((data) => {
      this.setData({
        imgUrl: data.url
      })
    })
  },
  refurbish() {
    //获取关系表中当前分类id 对应的所有商品id
    dbGet({
      name: 'conect',
      where: {
        parid:this.data.parid
      }
    }).then((data) => {
      let arr = []
      data.map(item=>{
        arr.push(item.id)
      })
      
      dbGet({
        name: 'list',
        where:{
          _id: _.in(arr)
        }
      }).then((listData) => {
        this.setData({
          listData
        })
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