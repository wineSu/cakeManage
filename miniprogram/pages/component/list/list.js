import { dbDel } from '../../../utils/api';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listsData: {
      type: Object,
    },
    listsName: {
      type: String,
    },
    listtype:{
      type: String,
      value: 'cakes'
    },
    classfiy:{
      type: Boolean,
      value: false
    },
    parid:{
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle(e){
      const data = e.currentTarget.dataset
      let _id = ''
      if (data.id){
        _id = data.id
      }
      if (this.data.classfiy){
        wx.navigateTo({
          url: '../editDetails/editDetails?parid=' + this.data.parid + '&id=' + _id
        })
      }else{
        wx.navigateTo({
          url: '../editDetail/editDetail?type=' + this.data.listtype+'&name=' + this.data.listsName + '&id=' + _id
        })
      }
    },
    del(e){
      const data = e.currentTarget.dataset
      dbDel({
        name: this.data.listsName,
        fileId: data.fileid,
        doc: data.id,
      }).then(res => {
        let pages = getCurrentPages()[0];//当前页面
        pages.onShow()
      })
    },
    classfiydel(e){
      const data = e.currentTarget.dataset
      dbDel({
        name: 'list',
        fileId: data.fileid,
        doc: data.id,
      }).then(res => {
        let pagess = getCurrentPages()[1];//当前页面
        pagess.onShow()
        wx.cloud.callFunction({
          // 云函数名称
          name: 'del',
          // 传给云函数的参数
          data: {
            names: 'conect',
            where:{
              id: data.id
            }
          }
        })
        let pages = getCurrentPages()[0];//当前页面
        pages.onShow()
      })
    }
  }
})
