import React, { Component } from "react";
// 引入antd包
import { Button, Table,Tooltip,Input } from 'antd';

// 引入connect关联，导出redux的数据
import { connect } from 'react-redux'

// 引入action请求
import { getSubject,getSecSubjectList } from '../Subject/redux' // 引入action异步

// 引入antd图标
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

// import { reqGetSubjectList } from '@api/edu/Subject'

//引入样式
import './index.css'









@connect(state => ({ subjectList: state.subjectList }), { getSubject,getSecSubjectList })
class Subject extends Component {
  curentPage = 1
  state = {
    // subjectId的作用:
    // 1. 如果subjectId没有表示表格每一行直接展示课程分类的title,如果有值(应该就是要修改数据的id), 就展示input
    // 2. 修改数据需要subjectid
    subjectId: '',
    subjectTitle: '' //用于设置受控组件
  }
 

  componentDidMount() {
    // console.log("did mount");
    // this.getHandleSubject(1, 10)
    this.props.getSubject(1, 10)
    
  }
  
  
  
  
  // getHandleSubject = async (page, limit) => {
    
    //   let res = await reqGetSubjectList(page, limit)
    //   this.setState({
      //     subject: res
      //   })
      
      // }
      
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
    // console.log(this.props);
    this.props.history.push('/edu/subject/add')
  }

  // 给数据添加children
  handleClickExpand = (expanded, record) => {
    //   this.props.subjectList.items.forEach(item => {
    //       return item.children = []
    //   })
    // console.log(expanded,record);
    if(expanded){
      this.props.getSecSubjectList(record._id)
    }

  }

  // 点击更新按钮事件
  handleUpdateClick= value=>{
    return ()=>{
      this.setState({
        subjectId:value._id,
        subjectTitle:value.title
      })
    }
  }
  // 修改数据受控组件Input
  handleTitleChange = e=>{
    this.setState({
      subjectTitle:e.target.value
    })
  }

  render() {
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
          if(this.state.subjectId === value._id){
            return (
              <>
                <Button type='primary' className='update-btn'>
                  确认
                </Button>
                <Button type='danger'>取消</Button>
              </>
            )
          }
          return (<> <Tooltip title='更新课程分类'><Button onClick={this.handleUpdateClick(value)} type="primary" className='Subject-button'><FormOutlined /></Button></Tooltip> <Tooltip title='删除课程分类'><Button type='danger'><DeleteOutlined /></Button></Tooltip></>)} ,
        width: 200
      },
    ];
      // console.log(this.props.subjectList);
    // console.log("length:",this.props.subjectList.items,this.props.subjectList.total);
    return <div className='Subject-btn'>
      <Button type="primary" onClick={this.handleGoAddSubject}><PlusOutlined />新建</Button>
      <Table
        columns={columns}
        expandable={{
        //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          // rowExpandable: record => record.name !== 'Not Expandable',
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

