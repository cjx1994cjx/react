import React, { Component } from "react";
// 引入antd包
import { Button, Table } from 'antd';

// 引入connect关联，导出redux的数据
import { connect } from 'react-redux'

// 引入action请求
import { getSubject } from '../Subject/redux' // 引入action异步

// 引入antd图标
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

// import { reqGetSubjectList } from '@api/edu/Subject'

//引入样式
import './index.css'






const columns = [
  { title: '课程名称', dataIndex: 'title', key: 'name' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () => <><Button type="primary" className='Subject-button'><FormOutlined /></Button><Button type='danger'><DeleteOutlined /></Button></>,
    width: 200
  },
];


@connect(state => ({ subjectList: state.subjectList }), { getSubject })
class Subject extends Component {
  curentPage = 1
  // state = {
  //   subject: ''
  // }

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

  render() {
    // console.log("length:",this.props.subjectList.items,this.props.subjectList.total);
    return <div className='Subject-btn'>
      <Button type="primary" onClick={this.handleGoAddSubject}><PlusOutlined />新建</Button>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
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
      />,
    </div>;
  }
}

export default Subject

