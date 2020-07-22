import React, { Component } from 'react'



// 引入LIck 
import { Link } from 'react-router-dom'
// 引入CArd 
import { Card, Form, Input, Button, Select ,message} from 'antd';
// 引入图标
import { ArrowLeftOutlined } from '@ant-design/icons'
// 引入请求方法
import { reqGetSubjectList, reqAddSubjectList} from '@api/edu/Subject'


// import { FormInstance } from 'antd/lib/form';

//引入样式
import './index.css'

//定义Option
const { Option } = Select;

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 4 },
};
const tailLayout = {
    wrapperCol: { offset: 1, span: 3 },
};




export default class AddSubject extends Component {
    state = {
        subjectList: {
            total: 0,
            items: []
        }
    }
    page = 1
    async componentDidMount() {
        let res = await reqGetSubjectList(1, 10)
        this.setState({
            subjectList: res
        })
    }

    //下拉框显示加载数据
    handleloadMore = async () => {
        let res = await reqGetSubjectList(this.page++, 10)
        // console.log(res)
        let newItems = [...this.state.subjectList.items, ...res.items]
        this.setState({
            total: res.total,
            items: newItems
        })
    }

    onFinish = async values => {
        // console.log('Success:', values)
        try{
            
            await reqAddSubjectList(values.subjectname,values.parentid)
            console.log(111)
            message.success('课程分类添加成功')
            this.props.history.push('/edu/subject/list')
        }catch{
            message.error('课程分类添加失败')
        }
        
    }

    render() {
        return (
            <Card title={<>
                <Link to='/edu/subject/list'>
                    <ArrowLeftOutlined />
                </Link>
                <span className='add-subject'>新增课程</span>
            </>}>
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item name="subjectname" label="课程名称" rules={[{ required: true ,message:'请输入课程名称' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="parentid" label="课程分类" rules={[{ required: true ,message:'请选择课程分类'}]}>
                        <Select

                            dropdownRender={menu => {
                                return (
                                    <>
                                        {menu}
                                        {this.state.subjectList.total >
                                            this.state.subjectList.items.length && (
                                                <Button type='link' onClick={this.handleloadMore}>
                                                    加载更多数据
                                                </Button>
                                            )}
                                    </>
                                )
                            }}

                        >
                            <Option value="0" key={0}>一级课程分类</Option>
                            {this.state.subjectList.items.map(item => {
                                return <Option key={item._id}>{item.title}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    {/* <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {({ getFieldValue }) => {
                            return getFieldValue('gender') === 'other' ? (
                                <Form.Item
                                    name="customizeGender"
                                    label="Customize Gender"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            ) : null;
                        }}
                    </Form.Item> */}
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            添加
          </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
