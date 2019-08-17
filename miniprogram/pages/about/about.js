import {
  dbGet,
  dbAdd,
  dbUpload,
  dbDel
} from '../../utils/api';
let param = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataall:{}
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
      if (data.length != 0){
        this.setData({
          dataall: data[0]
        })
      }
    })
  },
  bindFormSubmit(e) {
    dbAdd({
      name: 'about',
      data:{
        story:{
          title:'品牌故事',
          cont: e.detail.value.textarea
        }
      },
      doc: this.data.dataall._id,
    }).then(res=>{
      this.onLoad()
    })
  },
  bindKeyInput(e){
    const key = e.currentTarget.dataset.type
    param[key] = e.detail.value
  },
  saveLainxi(){
    let arr = Object.getOwnPropertyNames(param)
    if (arr.length != 0) {
      dbAdd({
        name: 'about',
        data:param,
        doc: this.data.dataall._id,
      }).then(res=>{
        this.onLoad()
      })
    }
  },
  up(){
    dbUpload({
      name: 'about',
      doc: this.data.dataall._id,
    }).then(res => {
      this.onLoad()
    })
  },
  change(e){
    const data = e.currentTarget.dataset
    dbUpload({
      name: 'about',
      fileId: data.fileid,
      doc: data.id,
    }).then(res => {
      this.onLoad()
    })
  },
  onShow: function () {
    param = {}
  }
  
})