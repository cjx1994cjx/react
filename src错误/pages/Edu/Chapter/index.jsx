import React, { Component } from "react";
import { Button, message, Tooltip, Modal, Alert, Table, Input } from "antd";
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
//导入全屏的包
import screefull from 'screenfull'

import Player from 'griffith'

import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import SearchForm from "./SearchForm";
import { getLessonList,getDelSubjectList,getDelLessonList } from './redux'

import "./index.less";

dayjs.extend(relativeTime);

@connect(
  (state) => ({
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
    chapterList: state.chapterList
  }), { getLessonList,getDelSubjectList,getDelLessonList }
  // { getcourseList }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,//控制modal窗口是否展示
    previewImage: "",
    selectedRowKeys: [],
    video: ''
  };

  shouModal = video => () => {
    this.setState({
      previewVisible: true,
      // previewImage: img,
      video
    });

  };

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };

  onSelectChange = (selectedRowKeys) => {
    // console.log(selectedRowKeys);
    this.setState({
      selectedRowKeys,
    });
  };

  handleClickExpand = (expand, record) => {
    // console.log(expand, record);
    if (expand) {
      this.props.getLessonList(record._id)
    }

  }
  //新增课时
  addUpLesson = data => () => {
    // console.log(this.props);
    console.log(data);
    this.props.history.push('/edu/chapter/addlesson', data)
  }

  // 批量删除
  handleAllDelete = () => {

    Modal.confirm({
      title: '确定要批量删除吗?',
      onOk: () => {
        // 章节
        let chapterIds = []

        //课程
        let lessonIds = []

        // 获取点击选中的ID
        let selectedRowKeys = this.state.selectedRowKeys
        // 获取全部章节及课时的内容
        let chapterList  = this.props.chapterList.items

        chapterList.forEach(chanpter => {
          // 拿到章节的ID
          let chapterId =chanpter._id

          let index = selectedRowKeys.indexOf(chapterId)


          if(index > -1){
            let newArr =selectedRowKeys.splice(index,1)
            chapterIds.push(newArr[0])
          }
        })
        lessonIds = [...selectedRowKeys]

        console.log(chapterIds)
        // console.log(selectedRowKeys)
        this.props.getDelSubjectList(chapterIds)
        this.props.getDelLessonList(lessonIds)
        message.success('删除成功')


      }
    })

  }

  // 全屏
  handlescreenFull =()=> {
    screefull.request()
    // screefull.toggle()
  }
  render() {
    const sources = {
      hd: {
        play_url: this.state.video,
        bitrate: 1,
        duration: 1000,
        format: '',
        height: 500,
        size: 160000,
        width: 500
      }
    }
    // console.log(this.props);
    const { previewVisible, previewImage, selectedRowKeys } = this.state;

    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        render: (isFree) => {
          return isFree === true ? "是" : isFree === false ? "否" : "";
        },
      },
      {
        title: '视频',
        render: value => {
          // console.log(value);
          // 章节数据没有free属性，不展示
          if (!value.free) return
          return <Button onClick={this.shouModal(value.ivdeo)}>预览</Button>
        }
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: (data) => {
          // console.log(data);
          return (
            <div>
              {data.free === undefined && (<Tooltip title="新增课时">
                <Button type='primary' style={{ marginRight: "10px" }} onClick={this.addUpLesson(data)}>
                  <PlusOutlined />
                </Button>
              </Tooltip>)}

              <Tooltip title={data.free === undefined ? '更新章节' : '更新课时'}>
                <Button type="primary" style={{ marginRight: "10px" }}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title={data.free === undefined ? '删除章节' : '删除课时'}>
                <Button type="danger">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          );
        }
      },
      // },
    ];



    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      // hideDefaultSelections: true,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   }
      // ]
    };

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button type="danger" style={{ marginRight: 10 }} onClick={this.handleAllDelete}>
                <span>批量删除</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn" onClick={this.handlescreenFull}>
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList.items}
            rowKey="_id"
            // expandable={{onExpand:this.handleClickExpand}}
            expandable={{
              onExpand: this.handleClickExpand
            }}
          />
        </div>
        {/* antd对话框组件，预览功能就是在modal中实现预览视频 */}
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
          title={'视频'}
        >
          <Player
            sources={sources}
            id={'1'}
            cover={'http://localhost:3000/logo512.png'}
            duration={1000}
          ></Player>
          {/* <img alt="example" style={{ width: "100%" }} src={previewImage} /> */}
        </Modal>
      </div>
    );
  }
}

export default Chapter;
