// 引入课程分类常量名
import {GET_SEC_LIST} from './constant'

// 引入二级请求数据请求
import {reqGetSecList} from '@api/edu/course'

// 获取二级课程分类同步action
const getSecAllListSync= (data) => {
    return {type:GET_SEC_LIST,data}
}

// 获取二级课程分类异步action
export function getSecAllList (data){
    return dispatch => {
        return reqGetSecList(data).then(res => {
            dispatch(getSecAllListSync(res))
            return res
        })
    }
}