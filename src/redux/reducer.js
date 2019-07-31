/**@file:用来根据老的state和指定的action生成返回新的state函数**/
/**
 * @function:用来管理头部标题的reducer函数
 * **/

import storageUtils from '../utils/storageUtils'
import { combineReducers } from 'redux'
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER
} from './action-types'

/*用来管理头部标题的状态*/
const initHeadTitle = '首页'

function headTitle(state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

/*用来管理当前登录用户的状态*/
const initUser = storageUtils.getUser()

function user(state = initUser, action) {
  console.log(('state'), state, ('action'), action)
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case SHOW_ERROR_MSG:
      const errorMsg = action.msg
      return {...state,errorMsg}
    case RESET_USER:
      return {}
    default:
      return state
  }
}

/**向外默认暴露的是合并产生的总得reducer函数
 * 管理总得state的结构**/
export default combineReducers({
  headTitle,
  user,
})