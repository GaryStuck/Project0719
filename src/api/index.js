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

export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user,
    'POST')

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
// reqWeather('北京')
//jsonp天气接口函数


