import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// 添加主机地址，在mock上使用获取地址，不设置他会在package获取主机地址

// const MOCK_URL = `http://localhost:8888${BASE_URL}`

// 获取一级分类ID
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}

// 获取二级分类课程
export function reqGetSecSubjectList(parenId) {
  return request({
    url: `${BASE_URL}/get/${parenId}`,
    method: "GET",
  });
}

// 添加课程分类
// export function reqAddSubjectList(title, parenId) {
//   console.log(title,parenId)
//   return request({
//     url: `${BASE_URL}/save`,
//     method: "POST",
//     data: {
//       title,
//       parenId
//     }
//   });
// }
export function reqAddSubjectList(title, parentId) {
  // console.log(title, parentId)
  // request返回一个promise
  return request({
    url: `${BASE_URL}/save`,
    // http://localhost:8888/admin/edu/subject/1/10
    method: 'POST',
    data: {
      title,
      parentId
    }
  })
}
// 更新课程分类数据
export function reqGetupdateSubjectList(id,title) {
  // console.log(id,title)
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data:{
      id,title
    }
  });
}

// 删除数据
export function reqSubjectDelete(id){
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
    data:{
      id
    }
  });
}

 // 获取所有一级课程分类
 export function reqAllSubjectList(){
  return request({
    url: `${BASE_URL}`,
    method: "GET"
  });
}


