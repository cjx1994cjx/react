import React, { Component } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs } from "antd";
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

import { login } from "@redux/actions/login";

import "./index.less";

const { TabPane } = Tabs;

@withRouter
@connect(null, {
  login,
})
class LoginForm extends Component {
  onFinish = ({ username, password }) => {
    this.props.login(username, password).then((token) => {
      // 登录成功
      // console.log("登陆成功~");
      // 持久存储token
      localStorage.setItem("user_token", token);
      this.props.history.replace("/");
    });
    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  };

// `长度大于4
//长度小于16
// 必须填写账号密码


  userDator = (rule,value) =>{
    // return new Promise(( res,reject)=> {
    //   if(!value){
    //     return reject('必填值')
    //   }

    //   if(value.length < 4){
    //     return reject('最少4个字符')
    //   }

    //   if(value.length >16){
    //     return  reject('最多16个字符')
    //   }
    //   if(!/^[a-zA-Z0-9_]+$/.test(value)){
    //     return reject('用户名只能写数字，字母，下划线')
    //   }

    //   res()
    // })
  }


  valiDator =(rule,value) => {
    // return new Promise(( res,reject)=> {
    //   if(!value){
    //     return reject('密码必填值')
    //   }

    //   if(value.length < 4){
    //     return reject('最少4个字符')
    //   }

    //   if(value.length >16){
    //     return  reject('最多16个字符')
    //   }
    //   if(!/^[a-zA-Z0-9_]+$/.test(value)){
    //     return reject('密码只能写数字，字母')
    //   }

    //   res()
    // })
  }

  render() {
    return (
      <>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Tabs
            defaultActiveKey="user"
            tabBarStyle={{ display: "flex", justifyContent: "center" }}
          >
            <TabPane tab="账户密码登陆" key="user">
              <Form.Item name="username"
              rules={[
                {validator:this.userDator}
              ]}
              >
                <Input
                  prefix={<UserOutlined className="form-icon" />}
                  placeholder="用户名: admin"
                />
              </Form.Item>
              <Form.Item name="password"
               rules={[
                {validator:this.valiDator}
              ]}>
                <Input
                  prefix={<LockOutlined className="form-icon" />}
                  type="password"
                  placeholder="密码: 111111"
                />
              </Form.Item>
            </TabPane>
            <TabPane tab="手机号登陆" key="phone">
              <Form.Item name="phone">
                <Input
                  prefix={<MobileOutlined className="form-icon" />}
                  placeholder="手机号"
                />
              </Form.Item>

              <Row justify="space-between">
                <Col span={16}>
                  <Form.Item name="verify">
                    <Input
                      prefix={<MailOutlined className="form-icon" />}
                      placeholder="验证码"
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Button className="verify-btn">获取验证码</Button>
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
              htmlType="submit"
              className="login-form-button"
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
}

export default LoginForm;
