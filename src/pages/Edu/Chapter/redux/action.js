// 导入常量
import {GET_CHAPTER_LIST,GET_LESSON_LIST} from './constant'
import {reqGetChapterList} from  '@api/edu/chapter'
import {reqGetLessonList} from  '@api/edu/lesson'
// 获取章节异步cation
export function getChapterList ({page,limit,courseId}) {
    // console.log({page,limit,courseId})
    return dispatch => {
        reqGetChapterList({page,limit,courseId}).then(res => {
            // console.log(res)
            dispatch(getChapterListSync(res))
            return res
        })
    }
}

function getChapterListSync(data){
    return {
        type:GET_CHAPTER_LIST,data
    }
}
export function getLessonList (chapterId) {
    // console.log({page,limit,courseId})
    return dispatch => {
        reqGetLessonList(chapterId).then(res => {
            // console.log(res)
            dispatch(getLessonListSync(res))
            return res
        })
    }
}

function getLessonListSync(data){
    return {
        type:GET_LESSON_LIST,data
    }
}