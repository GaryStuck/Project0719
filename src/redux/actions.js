/**@file:包含n个action creator函数的模块
 * 同步action：对象{type：'xxx',data:数据值}
 * 异步action：函数：dispatch=>{}
 * **/
import { reqLogin } from '../api'
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
} from './action-types'
import storageUtils from '../utils/storageUtils'
import { message } from 'antd'

//设置头部标题的同步action
export const setHeadTitle = (headTitle) => ({
  type: SET_HEAD_TITLE,
  data: headTitle,
})
//接收的user的同步action
export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
})

/**@function:显示错误信息的同步action**/
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})

/**@function:退出登录的同步action**/
export const logout = () => {
  //1.删除local中的user
  storageUtils.removeUser()
  //返回action对象
  return {type: RESET_USER}
}

/**
 *@param:登录的异步action**/
export const login = (username, password) => {
  return async dispatch => {
    //1.执行异步ajax请求
    const {data: {data, status, msg}} = await reqLogin(username, password)
    //2.成功，分发成功的action
    if (status === 0) {
      //保存到local中
      storageUtils.saveUser(data)
      dispatch(receiveUser(data))
      message.success('登陆成功')
    } else {
      //3.失败，分发失败的action
      message.error(msg)
      dispatch(showErrorMsg(msg))
    }
  }
}
