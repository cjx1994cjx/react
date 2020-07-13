// 引入Hooks方法
import React,{useEffect,useState} from "react";
import { Form, Select, Button, message } from "antd";

// 引入获取数据方法请求
import {reqGetCourseList} from '@api/edu/course'

import {connect} from 'react-redux'

import {getChapterList} from '../redux'

import "./index.less";

const { Option } = Select;

function SearchForm(props) {
  // 使用Hokks，定义useState，获取courseList数据给展示组件拿到数据
  const [courseList,setCourseList] =useState([])


  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
  };
// Hooks的useEffect方法，发送请求获取数据
useEffect(() => {
  // 不能直接在useEffect，重新定义一个异步函数
  async function fetchData(){
    // 发送请求获取的课程列表
    let res =await reqGetCourseList()
    // 将获得的课程列表传给useState里的setCourseList
    setCourseList(res)
    // console.log(res);
  }
  // 调用异步方法
  fetchData()
}, [])
//根据课程获取章节列表数据
const handlegetChapterList = async (value) => {
  // console.log(value);
  const data ={
    page:1,
    limit:10,
    courseId:value.teacherId
  }
  await props.getChapterList(data)
  message.success('获取章节列表数据成功')
} 

  return (
    <Form layout="inline" form={form} onFinish={handlegetChapterList}>
      <Form.Item name="teacherId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {/* 动态渲染课程列表数据到展示月面 */}
          {courseList.map(coures => {return <Option key={coures._id} value={coures._id}>{coures.title}</Option>})}
         
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null,{getChapterList})(SearchForm)
