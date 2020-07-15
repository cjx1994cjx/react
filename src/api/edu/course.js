import request from "@utils/request";

const BASE_URL = "/admin/edu/course";

// 获取所有课程列表
export function reqGetCourseList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}





