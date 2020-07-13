import { GET_CHAPTER_LIST, GET_LESSON_LIST } from './constant'

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
        default:
            return prevState
    }

}