//index.js
//获取应用实例
const app = getApp()
var tempApp = require('../../app.js')
var util = require('../../utils/util.js')
Page({
  data: {
    tempFilePaths: ''
  },
  onLoad: function () {
    console.log('onLoad')
  },
  chooseimage: function () {
    var _this = this;
    console.log('chooseimage')
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        //先清空数据 TODO 
        // tempApp.myShowSuccess('success')
        var tempFilePaths = res.tempFilePaths
        console.log('chooseimage success,res =', tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
        //上传图片
        wx.uploadFile({
          url: 'http://127.0.0.1:3000/aliyun/api/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = util.stringToJson(res.data)
            console.log('uploadData res:', res)
            if (data.code == 200){
              _this.setData({
                jsondata: '您的颜值评分为:' + data.result
              })
            }else {
              wx.showToast({
                title: '颜值分析失败',
              })
            }
          },
          fail:function(error){
            console.log('error:',error)
            wx.showToast({
              title: '颜值分析失败',
            })
          },
          complete:function(){

          }
        })
      },
      fail:function(error){
        console.log('chooseimage failed ',error)
      },
      complete:function(){
        console.log('chooseimage complete')
      }
    })
  },
  faceApi: function () {
    wx.request({
      url: 'http://127.0.0.1:3000/aliyun/api/postTest',
      data: {
        orderId: '1'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
         
        } else {

        }
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {

      }
    });
  },  
})
