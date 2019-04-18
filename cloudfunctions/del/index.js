// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection(event.name).where(event.where).remove()
  } catch (e) {
    console.error(e)
  }
}