import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";


// 获取课程数据
export function reqGetLessonList(chapterId) {
    
    return request({
      url: `${BASE_URL}/get/${chapterId}`,
      method: "GET",
      
    });
  }

  // 新增课时上传视频获取七牛云的TOKEN方法
  export function reqGetQiniuToken(){
    return request({
      url:'/uploadtoken',
      method:'GET'
    })
  }

  // 新增课时

export function reqAddLesson({chapterId,title,file,video}){
    return request({
      url:`${BASE_URL}/save`,
      method:'POST',
      data:{
        chapterId,title,file,video
      }
    })
  }



