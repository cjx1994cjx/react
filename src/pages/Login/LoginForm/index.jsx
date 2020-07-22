import React, { Component, useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login,mobileLogin } from "@redux/actions/login";

import { reqGetverifyCode } from '@api/acl/oauth'

import "./index.less";

const { TabPane } = Tabs;


// class LoginForm extends Component {
function LoginForm(props) {
  const [form] = Form.useForm()

  const [isShowDwonCount, setIsShowDwonCount] = useState(false)
  let [downCount, setdownCount] = useState('5')
  let [activeKey, setactiveKey] = useState('user')
  // state ={
  //   phoneDatorvalue:''
  // }

  const onFinish = () => {
    if (activeKey === 'user') {
      form.validateFields(['username', 'password']).then(res => {
        let { username, password } = res
        props.login(username, password).then((token) => {
          localStorage.setItem("user_token", token);
          props.history.replace("/");
        });
      })
    } else {
      form.validateFields(['phone', 'verify']).then(res => {
        let { phone, verify } = res
        props.mobileLogin(phone, verify).then((token) => {
          localStorage.setItem("user_token", token);
          props.history.replace("/");
        })
      })

    }
    // props.login(username, password).then((token) => {
    //   // 登录成功
    //   // console.log("登陆成功~");
    //   // 持久存储token
    //   localStorage.setItem("user_token", token);
    //   props.history.replace("/");
    // });
    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  }

  // `长度大于4
  //长度小于16
  // 必须填写账号密码


  const userDator = (rule, value) => {
    // console.log(rule, value);
    return new Promise((res, reject) => {
      if (!value) {
        return reject('必填值')
      }

      if (value.length < 4) {
        return reject('最少4个字符')
      }

      if (value.length > 16) {
        return reject('最多16个字符')
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return reject('用户名只能写数字，字母，下划线')
      }

      res()
    })
  }


  const valiDator = (rule, value) => {
    return new Promise((res, reject) => {
      if (!value) {
        return reject('密码必填值')
      }

      if (value.length < 4) {
        return reject('最少4个字符')
      }

      if (value.length > 16) {
        return reject('最多16个字符')
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return reject('密码只能写数字，字母')
      }

      res()
    })
  }

  // phoneDator = (rule,value) =>{
  //   console.log(rule,value);
  //   return new Promise(( res,reject)=> {
  //     if(!value){
  //       return reject('请填写正确的手机号码')
  //     }

  //     if(value.length !== 11){
  //       return reject('手机号码为11个数字')
  //     }
  //     if(value.length === 11){
  //       this.setState({
  //         phoneDatorvalue:value
  //       })
  //       // console.log(this.state.phoneDatorvalue);
  //     }
  //     res()
  //   })
  // }

  const phoneClick = async () => {
    // console.log(this.state.phoneDatorvalue);

    // if(this.state.phoneDatorvalue){
    //   reqGetverifyCode(this.state.phoneDatorvalue)
    // }
    // form.validateFields(['phone']).then(res=>{
    //   console.log(res);
    // })

    let res = await form.validateFields(['phone'])
    console.log('成功', res);

    await reqGetverifyCode(res.phone)

    setIsShowDwonCount(true)

    let tiemID = setInterval(() => {
      setdownCount(--downCount)
      if (downCount === 0) {
        clearInterval(tiemID)
        setIsShowDwonCount(false)
        setdownCount('5')
      }

    }, 1000)
  }
  // tab切换出发的事件处理函数
  const handleTabChange = (activeKey) => {
    setactiveKey(activeKey)
  }


  // console.log(this.state.phoneDatorvalue);
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Tabs
          defaultActiveKey="user"
          tabBarStyle={{ display: "flex", justifyContent: "center" }}
          onChange={handleTabChange}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item name="username"
              rules={[
                { validator: userDator }
              ]}
            >
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item name="password"
              rules={[
                { validator: valiDator }
              ]}>
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item name="phone"
              // rules={[{ validator: this.phoneDator }]}
              rules={[{
                required: true,
                message: '请输入手机号'
              },
              {
                pattern: /^1[3456789]\d{9}$/,
                message: '请输入正确的手机号码'
              }
              ]}
            >
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verify" rules={[{
                  required: true,
                  message: '请输入验证码'
                },
                {
                  pattern: /^[\d]{6}$/,
                  message: '请输入验证码'
                }
                ]

                }>
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button className="verify-btn" onClick={phoneClick} disabled={isShowDwonCount}>
                  {isShowDwonCount ? `${downCount}秒后获取` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            // htmlType="submit"
            className="login-form-button"
            onClick={onFinish}
          >
            登陆
            </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                  <GithubOutlined className="login-icon" />
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );

}

export default withRouter(connect(null, {
  login,mobileLogin
})(LoginForm))

