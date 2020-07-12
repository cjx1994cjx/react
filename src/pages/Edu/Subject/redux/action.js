// 引入请求方法
import {reqGetSubjectList,reqGetSecSubjectList} from '@api/edu/Subject'
// 引入常量
import {GET_SUBJECT_LIST,GET_SECSUBJECT_LIST} from './constant'

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

