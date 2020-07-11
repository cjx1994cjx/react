// 引入常量
import { GET_SUBJECT_LIST } from './constant'

const initSubJect = {
    total: 0, // 总数
    items: [], // 详细user数据
  };

export function subjectList(prevState =initSubJect, action) {
    switch (action.type) {
        case GET_SUBJECT_LIST:
            // console.log(action.type)
            return action.data
        default:
            return prevState
    }
}