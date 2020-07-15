import { GET_CHAPTER_LIST, GET_LESSON_LIST, GET_LESSON_DEL, GET_SUBJECT_DEL } from './constant'

const initChapterList = {
    total: 0,
    items: []
}

export default function chapterList(prevState = initChapterList, action) {
    switch (action.type) {
        case GET_CHAPTER_LIST:
            // console.log(action)
            action.data.items.forEach(item => {
                item.children = []
            })
            return action.data
        case GET_LESSON_LIST:
            // console.log(action)
            if (action.data.length > 0) {
                let chapterId = action.data[0].chapterId
                prevState.items.forEach(item => {
                    if (chapterId === item._id) {
                        item.children = action.data
                    }
                })
            }
            return { ...prevState }
        case GET_SUBJECT_DEL:
            // console.log(action.data)
            // 获得的数据保存到新的变量里
            let chapterId = action.data

            const newChapterId = prevState.items.filter(chanpter => {
                if(chapterId.indexOf(chanpter._id) > -1){
                    return false
                }
                return true
            })
            return { ...prevState,items:newChapterId}
        case GET_LESSON_DEL:
            // console.log(action)
            let lessonIds = action.data

            let chapterList = prevState.items
            console.log(chapterList)

            chapterList.forEach(chapter => {
                const newChapter = chapter.children.filter(lesson =>{
                    if(lessonIds.indexOf(lesson._id) > -1){
                        return false
                    }
                    return true
                })
                chapter.children = newChapter
            })
            console.log(chapterList)

            return { ...prevState,items: chapterList}
        default:
            return prevState
    }

}