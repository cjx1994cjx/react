import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// 添加主机地址，在mock上使用获取地址，不设置他会在package获取主机地址

// const MOCK_URL = `http://localhost:8888${BASE_URL}`

// 获取一级分类ID
export function reqGetSubjectList(page,limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}


