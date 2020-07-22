

import {GET_USER_INFO,GET_USER_MENU} from './constants'

import {getInfo,getMenu} from '@api/acl/login'



//  获取用户数据
function GetUserInfoSync(data){
  return {type:GET_USER_INFO,data}

}


export function getUserInfo(){
  return dispatch=>{
    return getInfo().then(res =>{
      dispatch(GetUserInfoSync(res))
      return res
    })
  }
}

// 拉取用户菜单
function GetUserMenuSync(data){
  return {type:GET_USER_MENU,data}

}


export function getUserMenu(){
  return dispatch=>{
    return getMenu().then(res =>{
      dispatch(GetUserMenuSync(res.permissionList))
      return res.permissionList
    })
  }
}

