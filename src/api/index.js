/**
 * @file:接口型函数,每个函数的返回值都是promise
 * 根据接口文档定义接口请求
 * **/

import ajax from './ajax'

//登录接口

export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')

export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')
