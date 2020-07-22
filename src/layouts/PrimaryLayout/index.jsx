import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
// import {withRouter} from 'react-router-dom'

import { connect } from 'react-redux'
import SiderMenu from '../SiderMenu'

import './index.less'

import logo from '@assets/images/logo.png'
import { withRouter } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
@withRouter
@connect(state => ({ user: state.user }))
class PrimaryLayout extends Component {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  render() {
    // console.log(this.props);
    let { name,avatar, permissionList } = this.props.user
    let path = this.props.location.pathname

    const reg = /[/][a-z]*/g
    let matchArr = path.match(reg)
    // 获取一级path
    const firstPath = matchArr[0]
    // 获取二级path的第一个
    const secPath = matchArr[1]
    // 获取二级path的第二个
    const thirdPath = matchArr[2] || ''
    
    let firstName
    let secName
    // 遍历，查找一级菜单名称和二级菜单名称
    
    permissionList.forEach(item => {
      if (item.path === firstPath) {
        firstName = item.name
        item.children.forEach(secItem => {
          if (secItem.path === secPath + thirdPath) {
            secName = secItem.name
          }
        })
      }
    })
    return (
      <Layout className='layout'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className='logo'>
            <img src={logo} alt='' />
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SiderMenu></SiderMenu>
          {/* <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item key='1' icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key='2' icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
              <Menu.Item key='3'>Tom</Menu.Item>
              <Menu.Item key='4'>Bill</Menu.Item>
              <Menu.Item key='5'>Alex</Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
              <Menu.Item key='6'>Team 1</Menu.Item>
              <Menu.Item key='8'>Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key='9' icon={<FileOutlined />} />
          </Menu> */}
        </Sider>

        <Layout className='site-layout'>
          <Header className='layout-header'>
            <img src={avatar} alt='' />
            <span>用户名</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className='layout-nav'>
              {firstName === undefined ? '首页':<Breadcrumb>
                <Breadcrumb.Item>{firstName}</Breadcrumb.Item>
                <Breadcrumb.Item>{secName}</Breadcrumb.Item>
              </Breadcrumb>}
              
              <div>{secName}</div>
              
            </div>

            <div className='layout-content'>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
export default PrimaryLayout