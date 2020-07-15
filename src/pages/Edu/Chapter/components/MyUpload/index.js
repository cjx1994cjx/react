import React, { Component } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { reqGetQiniuToken } from '@api/edu/lesson'

import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'



const MAX_VIDEO_SIZE = 2 * 1024 * 1024
export default class MyUpload extends Component {
  // 定义构造函数
  // 构造函数中只是从缓存中获取数据/定义状态
  constructor() {
    super()

    // 一进来要从缓存中获取有没有token
    const str = localStorage.getItem('upload_token')

    if (str) {
      // 如果是有内容的字符串,说明之前存储过token
      // 这里没有必要判断token是否已经过期,只需要把从缓存中拿到的值,赋值给state就可以
      // 把缓存中字符串拿到,转成对象 对象中有uploadToken, expires
      const res = JSON.parse(str)
      this.state = {
        expires: res.expires,
        uploadToken: res.uploadToken
      }
    } else {
      // 没有内容 undefined, 没有存储过
      this.state = {
        expires: 0,
        uploadToken: ''
      }
    }
  }

  //   state = {
  //     uploadToken: '',
  //     expires: 0
  //   }
  //上传视频之前调用
  handleBeforeUpload = (file, fileList) => {
    // file就是我们要上传的文件
    // console.log(file)

    return new Promise(async (resolve, reject) => {
      // 在上传视频之前要做的两件事
      // 1. 限制视频大小
      // 比如要限制的视频大小是20m
      // MAX_VIDEO_SIZE
      if (file.size > MAX_VIDEO_SIZE) {
        message.error('视频太大,不能超过20m')
        reject('视频太大,不能超过20m')
        // 如果视频过大,后面的代码不执行
        return
      }

      if (Date.now() > this.state.expires) {
        //过期了就要重新获取
        const { uploadToken, expires } = await reqGetQiniuToken()

        // 将数据存储起来
        // state里面有最新的数据, 本地缓存中也是有最新的数据
        this.saveUploadToken(uploadToken, expires)
      }

      resolve(file)
    })
  }

  // 存储uploadToken和过期时间的方法
  saveUploadToken = (uploadToken, expires) => {
    const targetTime = Date.now() + expires * 1000
    expires = targetTime
    const upload_token = JSON.stringify({ uploadToken, expires })
    localStorage.setItem('upload_token', upload_token)
    //   3. 存储到state里面
    this.setState({
      uploadToken,
      expires
    })
  }

  // 真正上传视频时调用, 这个函数会覆盖默认的上传方式
  handleCustomRequest = (value) => {
      console.log(value)
      const file = value.file
      const key = nanoid(10)
      const token = this.state.uploadToken
      const putExtra={
        mimeType: 'video/*'
      }
      const config ={region: qiniu.region.z2}
      console.log(file,key,token, putExtra,config)
    const observable = qiniu.upload(file, key, token, putExtra,config)


    const observer = {
        //上传过程中触发的回调函数
        next(res) {
            console.log('成功了',res)
            value.onProgress(res.total)
        },
        //上传失败触发的回调函数
        error(err) {
            console.log('失败', err)
            value.onError(err)
        },
        // 上传成功触发的回调函数
        complete:res=> {
            console.log('上传',res)
            value.onSuccess(res)
            // this.props.onChange('http://qdgftt8wp.bkt.clouddn.com//'+res.key)
            this.props.onChange('http://qdcdb1qpp.bkt.clouddn.com/'+res.key)
        }
    }

    this.subscription = observable.subscribe(observer)
  }


  componentWillUnmount(){
    this.subscription && this.subscription.unsubscribe()
  }

  render() {
    return (
      <div>
        <Upload
          beforeUpload={this.handleBeforeUpload}
          customRequest={this.handleCustomRequest}
        >
          <Button>
            <UploadOutlined /> 上传视频
          </Button>
        </Upload>
      </div>
    )
  }
}