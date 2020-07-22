// 导入常量
import {GET_CHAPTER_LIST,GET_LESSON_LIST,GET_LESSON_DEL,GET_SUBJECT_DEL} from './constant'
import {reqGetChapterList,reqAllDelChapter} from  '@api/edu/chapter'
import {reqGetLessonList,reqAllDelLesson} from  '@api/edu/lesson'
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

// 批量删除章节异步action
export function getDelSubjectList (chapterId) {
    console.log(chapterId)
    // console.log({page,limit,courseId})
    return dispatch => {
        reqAllDelChapter(chapterId).then(res => {
            // console.log(res)
            dispatch(getDelSubjectListSync(chapterId))
            return chapterId
        })
    }
}
// 批量删除章节同步action
function getDelSubjectListSync(data){
    return {
        type:GET_SUBJECT_DEL,data
    }
}
// 批量删除课时异步action
export function getDelLessonList (chapterId) {
    // console.log({page,limit,courseId})
    return dispatch => {
        reqAllDelLesson(chapterId).then(res => {
            // console.log(res)
            dispatch(getDelLessonListSync(chapterId))
            return chapterId
        })
    }
}
// 批量删除课时同步action
function getDelLessonListSync(data){
    return {
        type:GET_LESSON_DEL,data
    }
}