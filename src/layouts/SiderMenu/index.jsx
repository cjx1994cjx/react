import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'


import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
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

import {defaultRoutes} from '@conf/routes.js'

import Icons from '@conf/icons'

const {SubMenu} =Menu

@withRouter
@connect(state => ({permissionList:state.user.permissionList}))
class SiderMenu extends Component {
  // 定义一个函数，在函数中遍历数组，动态渲染
  // 要遍历二个数组，所以这个函数要调用2次
  renderMenu = (menus) => {
    // console.log(menus);
    // 1.遍历传进来的数组
    return menus.map(menu =>{
      // 先判断要不要展示这个菜单
      // console.log(menu.hidden);
      if(menu.hidden) return

      //通过Icons字符串找到对应的icons组件
      const Icon = Icons[menu.icon]
      if(menu.children && menu.children.length){
        // console.log(22);
        // 表示有二级菜单
        return (
          <SubMenu key={menu.path} icon={<Icon />} title={menu.name}>
              {menu.children.map(secMenu => {
                if(secMenu.hidden) return
                return <Menu.Item key={secMenu.path}>
                  <Link to={menu.path+secMenu.path}>{secMenu.name}</Link>
                  </Menu.Item>
              })}
              
            </SubMenu>
        )

      }else {
        // console.log(11);
        //表示有一级菜单
        // 这里return，是给新数组添加一个菜单组件
        return( 
          // 只有首页的一级菜单才需要使用Link
          
          // <span>111</span>
          <Menu.Item key={menu.path} icon={<Icon />}>
              {menu.path === '/' ? <Link to='/'>{menu.name}</Link> : menu.name}
            </Menu.Item>
        )
      }
    })

  }


  render() {
    // 在siderMenu里面要遍历2个数组
  // 1. config/router.js/defaultRoutes ==>登录后的首页
  // 2. redux中的peermisssionList ==>权限管理，教育管理，个人管理
    let path = this.props.location.pathname
    console.log(path);

    // 字符串有个match方法，match插入一个正侧表达式，数组存储我们要提取的值
    const reg = /[/][a-z]*/
    let firstPath = path.match(reg)
    return (
      <>
        <Menu theme='dark' defaultSelectedKeys={[path]} mode='inline' defaultOpenKeys={[firstPath[0]]}>
            {this.renderMenu(defaultRoutes)}
            {this.renderMenu(this.props.permissionList)}
            
            {/* <Menu.Item key='1' icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item> */}
            {/* <Menu.Item key='2' icon={<DesktopOutlined />}>
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
            <Menu.Item key='9' icon={<FileOutlined />} /> */}
          </Menu>
      </>
    )
  }
}

export default SiderMenu
