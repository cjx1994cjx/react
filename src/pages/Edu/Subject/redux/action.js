// 引入请求方法
import {reqGetSubjectList} from '@api/edu/Subject'
// 引入常量
import {GET_SUBJECT_LIST} from './constant'

const getSubjectListSync = (list) => ({
    type: GET_SUBJECT_LIST,
    data: list,
  });


export  function getSubject (page,limit,str){
    return dispatch => {
        // console.log("2222222222222222222",str)
        return reqGetSubjectList(page,limit).then(response => {
            dispatch(getSubjectListSync(response))
            // console.log("after dispatch")
            // return response
        })
    }
}

