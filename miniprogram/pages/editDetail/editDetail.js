import { 
  dbGet,
  dbAdd,
  dbUpload
} from '../../utils/api';

let param = {}
let op = {}

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
    param = {}
    op = options
    this.setData({
      types: op.type || 'cakes'
    })
    this.refurbish()
  },
  refurbish(){
    dbGet({
      name: op.name,
      doc: op.id
    }).then((datas) => {
      this.setData({
        datas
      })
    })
  },
  addimg(){
    dbUpload({
      name: op.name,
    }).then(res => {
      op.id = res._id
      this.refurbish()
    })
  },
  change(e){
    const data = e.currentTarget.dataset
    dbUpload({
      name: op.name,
      fileId:data.fileid,
      doc: data.id,
    }).then(res => {
      this.refurbish()
    })
  },
  bindKeyInput: function (e) {
    const key = e.currentTarget.dataset.type
    param[key] = e.detail.value
  },
  save(e){
    const data = e.currentTarget.dataset
    //数据没有修改不保存
    let arr = Object.getOwnPropertyNames(param)
    if (arr.length != 0){
      dbAdd({
        name: op.name,
        doc: data.id,
        data: param
      }).then(res => {
        this.refurbish()
      })
    }
  }
})