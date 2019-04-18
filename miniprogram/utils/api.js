export const app = getApp();
const db = app.globalData.db
export const _ = db.command
const tip = (text) => {
  wx.showToast({
    title: text,
    'icon': 'none',
    duration: 2000
  })
}

//查找
export const dbGet = (param)=>{
  if (param.loadStart){
    wx.showLoading({
      title: '加载中...'
    })
  }
  const promise = new Promise((resolve, reject) => {
    if (param.doc){
      db.collection(param.name)
        .doc(param.doc)
        .get()
        .then(res => {
          resolve(res.data)
          if (param.loadEnd) {
            wx.hideLoading()
          }
        }).catch(err => {
          tip('请联系开发者，连接错误！')
        })
    }else if(param.where){
      db.collection(param.name)
        .where(param.where)
        .get()
        .then(res => {
          resolve(res.data)
          if (param.loadEnd) {
            wx.hideLoading()
          }
        }).catch(err => {
          tip('请联系开发者，连接错误！')
        })
    }else{
      db.collection(param.name)
        .get()
        .then(res => {
          resolve(res.data)
          if (param.loadEnd) {
            wx.hideLoading()
          }
        }).catch(err => {
          tip('请联系开发者，连接错误！')
        })
    }
  })
  return promise
}

//添加或者更新数据
export const dbAdd = (param) => {
  if (param.loadStart) {
    wx.showLoading({
      title: '正在处理...'
    })
  }
  const promise = new Promise((resolve, reject) => {
    let control ={};
    if (param.doc){
      //数据替换
      control = db.collection(param.name).doc(param.doc).update({
        data: param.data
      })
    }else{
      //直接添加
      control = db.collection(param.name).add({
        data:param.data
      })
    }
    control.then(res => {
          resolve(res)
          tip('操作成功！')
        })
        .catch(err=>{
          tip('操作失败，请重试！')
        })
  })
  return promise
}

//删除数据或文件
export const dbDel = (param) => {
  const promise = new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: '删除后不可恢复，确认删除吗？',
      success(res) {
        if (res.confirm) {
          //删除多个
          if(param.where){
            wx.cloud.callFunction({
              // 云函数名称
              name: 'del',
              // 传给云函数的参数
              data: {
                names: param.name,
                where: param.where
              }
            })
          }else{
            //删除单个
            db.collection(param.name).doc(param.doc).remove().then(res => {
              resolve(res)
            })
          }
          if (param.fileId){
            //删除文件的情况   删除源文件
            wx.cloud.deleteFile({
              fileList: [param.fileId]
            })
          }
        }
      }
    })
  })
  return promise
}

//上传图片
export const dbUpload = (param) => {
  const promise = new Promise((resolve, reject) => {
    // 待插入的集合名字
    let nameStr = param.name
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '正在上传...'
        })
        //文件名称
        let filePath = res.tempFilePaths[0];
        const name = parseInt(Math.random() * 1000000000);
        const cloudPath = nameStr + name + filePath.match(/\.[^.]+?$/)[0]
        if (param.fileId){
          //更新文件得情况则先删除文件
          wx.cloud.deleteFile({
            fileList: [param.fileId]
          })
        }
        //上传文件到服务器
        wx.cloud.uploadFile({
          cloudPath,//云存储图片名字
          filePath//临时路径
        }).then(res=>{
          let fileID = res.fileID;
          //存储或者更新数据
          return dbAdd({
            name: nameStr,
            doc: param.doc || null,
            loadStart: true,
            data: {
              url: fileID
            }
          });
        }).then(res=>{
          resolve(res)
        });
      }
    })
  })
  return promise
}
