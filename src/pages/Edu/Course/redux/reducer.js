// 引入常量名称
import { GET_SEC_LIST } from './constant'

const initChapterList = {
    total:'',
    items:[]
}


// 暴露reducer
export default function courseList(prevState = initChapterList, action) {
    switch (action.type) {
        // 获取二级课程分类
        case GET_SEC_LIST:

            return action.data
        default:
            return prevState
    }

}