// 引入请求方法
import {reqGetSubjectList,reqGetSecSubjectList,reqGetupdateSubjectList} from '@api/edu/Subject'
// 引入常量
import {GET_SUBJECT_LIST,GET_SECSUBJECT_LIST,GET_UPDATASUBJECT_LIST} from './constant'

const getSubjectListSync = (list) => ({
    type: GET_SUBJECT_LIST,
    data: list,
  });


export  function getSubject (page,limit,str){
    return dispatch => {
        return reqGetSubjectList(page,limit).then(response => {
            dispatch(getSubjectListSync(response))
        })
    }
}
// 二级课程分类
const getSecSubjectListSync = (list) => ({
    type: GET_SECSUBJECT_LIST,
    data: list,
  });

// 二级分类课程action
export  function getSecSubjectList (parentId){
    return dispatch => {
        return reqGetSecSubjectList(parentId).then(response => {
            dispatch(getSecSubjectListSync(response))
        })
    }
}



const getUpdataSubjectListSync = (data) => ({
    type: GET_UPDATASUBJECT_LIST,
    data
  });
// 更新一级分类数据课程
export const getUpdataSubjectList =(parentId,title) =>{
    return dispatch => {
        return reqGetupdateSubjectList(parentId,title).then(response => {
            dispatch(getUpdataSubjectListSync({parentId,title}))
            return response
        })
    }
}

