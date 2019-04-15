// pages/component/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listsData: {
      type: Object,
    },
    listsType: {
      type: String,
    },
    source:{
      type: String,
      value:''
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
    add(e){
      const data = e.currentTarget.dataset.type
      wx.navigateTo({
        url: '../editDetail/editDetail?type=add&name='+data+'&source='+this.data.source
      })
    }
  }
})
