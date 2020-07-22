import request from "@utils/request";

const BASE_URL = "/admin/edu/course";

// 获取所有课程列表
export function reqGetCourseList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}

//获取课程分页列表
export function reqGetSecList({page,limit,teacherId,subjectId,subjectParentId,title}) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    parmas:{
      teacherId,subjectId,subjectParentId,title
    }
  });
}





