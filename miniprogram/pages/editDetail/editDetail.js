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
    op = options
    this.refurbish()
  },
  refurbish(){
    if (op.name == 'recommend'){
      //特惠
      dbGet({
        name: op.name
      }).then((data) => {
        this.setData({
          datas: data[0] || {}
        })
      })
    }
    if (op.source == 'index' && op.type == "add"){
      //首页新增
      dbGet({
        name: op.name
      }).then((data) => {
        this.setData({
          datas: {}
        })
      })
    }
  },
  addimg(){
    dbUpload({
      name: op.name,
    }).then(res => {
      this.refurbish()
    })
  },
  change(e){
    const data = e.currentTarget.dataset
    dbUpload({
      name: op.name,
      fileId:data.fileid,
      where: data.id,
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
    dbAdd({
      name: op.name,
      where: data.id,
      data: param
    }).then(res => {
      this.refurbish()
    })
  }
})