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
    datas:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    param = {}
    op = options
    if(op.id != ''){
      this.refurbish()
    }
  },
  refurbish() {
    dbGet({
      name: 'list',
      doc: op.id
    }).then((datas) => {
      this.setData({
        datas
      })
    })
  },
  addimg() {
    //列表库导入后  关系表也需要对应
    dbUpload({
      name: 'list',
    }).then(res => {
      op.id = res._id
      this.refurbish()
    })
  },
  change(e) {
    const data = e.currentTarget.dataset
    dbUpload({
      name: 'list',
      fileId: data.fileid,
      doc: op.id,
    }).then(res => {
      this.refurbish()
    })
  },
  bindKeyInput: function (e) {
    const key = e.currentTarget.dataset.type
    param[key] = e.detail.value
  },
  save() {
    //数据没有修改不保存
    let arr = Object.getOwnPropertyNames(param)
    if (arr.length != 0) {
      dbAdd({
        name: 'list',
        doc: op.id,
        data: param
      }).then(res=>{
        //对应关系表
        dbAdd({
          name: 'conect',
          data: op
        })
        this.refurbish()
      })
    }
  }
})