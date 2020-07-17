import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button, message } from "antd";
import { connect } from 'react-redux'

// // 导入所有讲师请求
import { reqGetAllTeacherList } from '@api/edu/teacher'

// // 导入所有课程一级分类
import { reqAllSubjectList, reqAllSecjectList } from '@api/edu/Subject'

// 导入二级课程分类列表
import {getSecAllList} from '../redux'



import "./index.less";


const { Option } = Select;


function SearchForm(props) {
  const [form] = Form.useForm();
  // 接受所有讲师数据
  const [teachers, setTeachers] = useState([])
  // 接收所有一级课程分类
  const [subJectList, setsubJectList] = useState([])

  // const [Options,setOptions] =useState([])

  useEffect(() => {
    // 定义函数使用async方法
    async function fetchData() {

      const [teachers, subJectList] = await Promise.all([
        // 获取讲师数据
        reqGetAllTeacherList(),
        // 获取全部课程分类
        reqAllSubjectList()
      ])


      // 遍历一级课程数据赋值给OPTIONS
      const options = subJectList.map(sub => {
        return {
          value: sub._id,
          label: sub.title,
          isLeaf: false
        }
      })

      setsubJectList(options)
      // 讲师数据赋值给组件使用
      setTeachers(teachers)
      // 将一级所有课程分类赋值给组件
      // setsubJectList(subJectList)
    }
    fetchData()

  }, [])




  
  // 获得2个值，value为父级ID，selectedOptions为每一个的数据的内容
  const onChange = (value, selectedOptions) => {
    // console.log(value, selectedOptions);


  };
  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // console.log(targetOption);
    let SecAll = await reqAllSecjectList(targetOption.value)



    // 一级菜单没有二级数据，就不给一级数据的children赋值

    SecAll =SecAll.items.map(item => {
      
        return {
          value:item._id,
          label: item.title,
      }
      
  })


    // load options lazily

    targetOption.loading = false;

    // 如果一级菜单数据没有二级数据，点击一级，每次都去请求二级，就不能给选中
    // 如果要选中，就要在获取二级数据之后，判断是否有二级数据，有就添加children属性，没有就给一级数据的isLeaf赋值为true，表欧式没有二级数据，那么点击就会直接选中，不会请求二级数据
    if(SecAll.length > 0){
      targetOption.children = SecAll
    }else {
      targetOption.isLeaf = true
    }

    
   
    // label: item.title,
    //       value: item._id
    // const aaa = []
    // aaa.push(targetOption)
    // console.log(a);
    // targetOption.children = [
    //   {
    //     label: SecAll.title,
    //     value: SecAll._id
    //   }
    // ];
    // let res = await reqAllSubjectList()
    setsubJectList([...subJectList]);


  };

  // handleSecClick =()=>{
  //   console.log(111);
  // }

  const resetForm = () => {
    form.resetFields();
  };
  //点击查询按钮的事件处理函数
  const finish = async value =>{
    // console.log( value );
    let subjectId 
    let subjectParentId
    if(value.subject && value.subject.length > 1){
      // 有一级和二级数据
      // console.log(22222,value.subject[0]);
      subjectId = value.subject[1]
      subjectParentId = value.subject[0]
    }

    if(value.subject && value.subject.length === 1){
      subjectId = value.subject[0]
      subjectParentId = 0
    }
    const data = {
      page:1,
      limit:5,
      title:value.title,
      teacherId:value.teacherId,
      subjectId,
      subjectParentId
    }
    await props.getSecAllList(data)
    message.success('课程数据获取成功')
  }
  

  return (
    <Form layout="inline" form={form} onFinish={finish}>
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
          options={subJectList}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder="课程分类"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
          // onClick={this.handleSecClick}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null,{getSecAllList})(SearchForm);
