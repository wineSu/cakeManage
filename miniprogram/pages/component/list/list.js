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
      type: Boolean
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
      wx.navigateTo({
        url: '../editDetail/editDetail?type=' + this.data.listtype+'&name=' + this.data.listsName + '&id=' + _id
      })
    },
    del(e){
      const data = e.currentTarget.dataset
      dbDel({
        name: this.data.listsName,
        fileId: data.fileid,
        where: data.id,
      }).then(res => {
        let pages = getCurrentPages()[0];//当前页面
        pages.onShow()
      })
    },
    classfiydel(e){
      
    },
    classfiyhandle(e){

    }
  }
})
