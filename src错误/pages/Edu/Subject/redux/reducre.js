// 引入常量
import { GET_SUBJECT_LIST,GET_SECSUBJECT_LIST,GET_UPDATASUBJECT_LIST } from './constant'

const initSubJect = {
    total: 0, // 总数
    items: [], // 详细user数据
  };

export function subjectList(prevState =initSubJect, action) {
    // console.log(action)
    switch (action.type) {
        case GET_SUBJECT_LIST:
            // 给返回的数据添加children属性
            action.data.items.forEach(item => {
                 item.children = []
            })    
            return action.data
        case GET_SECSUBJECT_LIST:
            if (action.data.items.length > 0) {
                const parentId = action.data.items[0].parentId
                // console.log(parentId)
                // 2. 找到对应的一级分类数据
                // 遍历一级分类
                prevState.items.forEach(item => {
                  // 找到了对应的一级分类
                  if (item._id === parentId) {
                    // 给一级分类的children赋值
                    item.children = action.data.items
                  }
                })
              }
              return {
                ...prevState
              }
            case GET_UPDATASUBJECT_LIST:
              // 遍历一级课程分类
              prevState.items.forEach(subject => {
                if(subject._id === action.data.parentId){
                  subject.title = action.data.title
                  return
                }
                // 遍历二级课程分类
                subject.children.forEach(child => {
                  if(child._id === action.data.parentId){
                    child.title = action.data.title
                  }
                })
              })
                return {...prevState}
        default:
            return prevState
    }
}