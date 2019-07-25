/**
 * @file:接口型函数,每个函数的返回值都是promise
 * 根据接口文档定义接口请求
 * **/

import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = ''

//登录接口
export const reqLogin = (username, password) => ajax(BASE + '/login',
    {username, password}, 'POST')
//添加用户接口
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user,
    'POST')
// reqWeather('北京')
//jsonp天气接口函数
export const reqWeather = (city) => {
  return new Promise(((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, (err, data) => {
      if (!err) {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        message.error('获取天气信息失败')
      }
    })
  }))
}
//获取一级二级分类列表
export const reqCategories = (parentId) => ajax(BASE + '/manage/category/list',
    {parentId}, 'GET')
//添加分类
export const reqAddCategories = (parentId, categoryName) => ajax(
    BASE + '/manage/category/add', {parentId, categoryName}, 'POST')
//更新分类
export const reqUpdateCategories = ({categoryId, categoryName}) => ajax(
    BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')
//根据ID获取分类
export const reqGetCategory = (categoryId) => ajax(
    BASE + '/manage/category/info', {categoryId})
//获取商品分页列表
export const reqGetList = (pageNum, pageSize) => ajax(
    BASE + '/manage/product/list', {pageNum, pageSize})
//搜索商品分页列表searchType:类型:
// productName根据商品名称搜索/productDesc根据商品描述搜索
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(
    BASE + '/manage/product/search',
    {
      pageNum,
      pageSize,
      [searchType]: searchName,
    })
//更新商品状态
export const reqUpdateStatus = (productId, status) => ajax(
    BASE + '/manage/product/updateStatus', {productId, status},'POST')