import React, { useState,useEffect } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";

// 导入所有讲师请求
import {reqGetAllTeacherList} from '@api/edu/teacher'
// 导入所有课程一级分类
import {reqAllSubjectList} from '@api/edu/Subject'

import "./index.less";

const { Option } = Select;

function SearchForm() {
  const [form] = Form.useForm();
  // 接受所有讲师数据
  const [teachers,setTeachers] = useState([])
  // 接收所有一级课程分类
  const [subJectList,setsubJectList] = useState([])

  useEffect(()=>{
    // 定义函数使用async方法
    async function fetchData(){

      const [teachers,subJectList] = await Promise.all([
         // 获取讲师数据
      reqGetAllTeacherList(),
      // 获取全部课程分类
      reqAllSubjectList()
      ])
     
      // console.log(subJectList);
      // 讲师数据赋值给组件使用
      setTeachers(teachers)
      // 将一级所有课程分类赋值给组件
      setsubJectList(subJectList)
    }
    fetchData()
    
  },[])


  // 遍历一级课程数据赋值给OPTIONS
  const options = subJectList.map(sub => {
    return {
      value:sub._id,
      label:sub.title,
      isLeaf: false
    }
  })


  // const [options, setOptions] = useState([
  //   {
  //     value: "zhejiang",
  //     label: "Zhejiang",
  //     isLeaf: false
  //   },
  //   {
  //     value: "jiangsu",
  //     label: "Jiangsu",
  //     isLeaf: false
  //   }
  // ]);

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      // targetOption.loading = false;
      // targetOption.children = [
      //   {
      //     label: `${targetOption.label} Dynamic 1`,
      //     value: "dynamic1"
      //   },
      //   {
      //     label: `${targetOption.label} Dynamic 2`,
      //     value: "dynamic2"
      //   }
      // ];
      // setOptions([...options]);
    }, 1000);
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <Form layout="inline" form={form}>
      <Form.Item name="title" label="标题">
        <Input placeholder="课程标题" style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label="讲师">
        <Select
          allowClear
          placeholder="课程讲师"
          style={{ width: 250, marginRight: 20 }}
        >
          {/* 动态渲染讲师数据 */}
          {teachers.map(item => {
            return <Option key={item._id} value={item._id}>{item.name}</Option>
          })}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label="分类">
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          // changeOnSelect
          placeholder="课程分类"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
