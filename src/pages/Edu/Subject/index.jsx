import React, { Component } from "react";
// 引入antd包
import { Button, Table,Tooltip,Input, message,Modal } from 'antd';

// 引入connect关联，导出redux的数据
import { connect } from 'react-redux'

// 引入action请求
import { getSubject,getSecSubjectList,getUpdataSubjectList } from '../Subject/redux' // 引入action异步

// 引入antd图标
import { PlusOutlined, FormOutlined, DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';

import { reqSubjectDelete } from '@api/edu/Subject'

//引入样式
import './index.css'


const { confirm } = Modal;

@connect(state => ({ subjectList: state.subjectList }), { getSubject,getSecSubjectList,getUpdataSubjectList })
class Subject extends Component {
  curentPage = 1
  sizePage = 10
  state = {
    // subjectId的作用:
    // 1. 如果subjectId没有表示表格每一行直接展示课程分类的title,如果有值(应该就是要修改数据的id), 就展示input
    // 2. 修改数据需要subjectid
    subjectId: '',
    subjectTitle: '' //用于设置受控组件
  }
 

  componentDidMount() {
    this.props.getSubject(1, 10)
    
  }
      
      handlePageChange = (page, size) => {
        this.props.getSubject(page, size)
        this.curentPage = page
      }
      
      handleSizeChange = (cuccess, pageSize) => {
    this.props.getSubject(cuccess, pageSize)
    this.curentPage = cuccess
  }

  // 点击新建跳转到添加界面
  handleGoAddSubject = () => {
    this.props.history.push('/edu/subject/add')
  }

  // 给数据添加children
  handleClickExpand = (expanded, record) => {
    if(expanded){
      this.props.getSecSubjectList(record._id)
    }

  }

  // 点击更新按钮事件
  handleUpdateClick= value=>{
    // console.log(222);
    return ()=>{
      this.setState({
        subjectId:value._id,
        subjectTitle:value.title
      })
      // 存储老的subjectTitle
      this.oldSubbjectTitle = value.title
    }
  }
  // 修改数据受控组件Input
  handleTitleChange = e=>{
    this.setState({
      subjectTitle:e.target.value.trim()
    })
  }
  // 取消按钮退出Iput
  handleCancelClick=()=>{
    this.setState({
      subjectId:''
    })
  }

  // 点击确认按钮更新数据
  handleUpdataClick = async()=> {
  // handleUpdataClick = (id,title) => {
    // console.log(title);
    let {subjectId,
    subjectTitle} = this.state
    // 设置课程名称不能为空
    if(subjectTitle.length === 0){
      message.error('课程分类名称不能为空')
    }
    // 设置名称相同不能发送请求
    if(this.oldSubbjectTitle === subjectTitle){
      message.error('课程名称不能相同')
      return
    }
    // if(subjectTitle !== subjectTitle){
    //   await this.props.getUpdataSubjectList(subjectId,subjectTitle)
    //   message.success('更改成功')
    //   this.handleCancelClick()
    // }
    // 在异步操作之前加个await，就可以让异步执行完毕后，才会执行后面的代码
    await this.props.getUpdataSubjectList(subjectId,subjectTitle)
    // return () =>{
    //   console.log(id,title);
    //   this.props.getUpdataSubjectList(id,title)
    //   message.success('更改成功')
    //   this.handleCancelClick()}
      // this.props.getUpdataSubjectList(id,title)
      message.success('更改成功')
      this.handleCancelClick()
    // }

    // return message.cuccess('相同')
    
  }

  //
  handleDel = value =>  () => {
    console.log(this.props);
    confirm({
      title: `你确定删除${value.title}吗?`,
      icon: <ExclamationCircleOutlined />,
      onOk:()=> {
        // let totalPage =Math.ceil()
        // if(this.curentPage !== 1 && this.props.subjectList.items.length === 1 &&  ){

        // }

        reqSubjectDelete(value._id)
        this.props.getSubject(this.curentPage,this.sizePage)
      }
    });
  }
  render() {
    // console.log(this.props);
    const columns = [
      { title: '课程名称', key: 'name' ,render:(value)=>{
        // , dataIndex: 'title'
        if(this.state.subjectId === value._id){
          return <Input value={this.state.subjectTitle}  onChange={this.handleTitleChange} style={{width:'20%'}}></Input>
        }
        // return <Input style={{width:'20%'}}></Input>
      return <span>{value.title}</span>
      }},
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: value =>{
          // console.log(value);
          if(this.state.subjectId === value._id){
            return (
              <>
                <Button type='primary' className='update-btn' onClick={this.handleUpdataClick}>
                {/* <Button type='primary' className='update-btn' onClick={this.handleUpdataClick(value._id,value.title)}> */}
                  确认
                </Button>
                <Button type='danger' onClick={this.handleCancelClick}>取消</Button>
              </>
            )
          }
          return (<> <Tooltip title='更新课程分类'><Button onClick={this.handleUpdateClick(value)} type="primary" className='Subject-button'><FormOutlined /></Button ></Tooltip> <Tooltip title='删除课程分类'><Button onClick={this.handleDel(value)} type='danger'><DeleteOutlined /></Button></Tooltip></>)} ,
        width: 200
      },
    ];
    return <div className='Subject-btn'>
      <Button type="primary" onClick={this.handleGoAddSubject}><PlusOutlined />新建</Button>
      <Table
        columns={columns}
        expandable={{
        onExpand: this.handleClickExpand
        }}
        dataSource={this.props.subjectList.items}
        rowKey='_id'
        pagination={{
          total: this.props.subjectList.total, //total表示数据总数
          showQuickJumper: true, //是否显示快速跳转
          showSizeChanger: true, // 是否显示修改每页显示数据数量
          pageSizeOptions: ['5', '10', '15'], //设置每天显示数据数量的配置项
          onChange: this.handlePageChange,
          // onShowSizeChange: this.handleSizeChange,
          current: this.curentPage
        }}
      />
      
    </div>;
  }
}

export default Subject

