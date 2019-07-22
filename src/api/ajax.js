/**
 * @file:发送ajax请求
 * @func:封装axios
 * **/

import axios from 'axios';

export default async function ajax(url, data = {}, type = 'GET') {
	type = type.toUpperCase();
	if (type === 'GET') {
		return await axios.get(url,{
			params: data  //指定请求的参数
		})
	}else {
		return await axios.post(url,data)
	}
}

/**@param:请求登录接口**/
// ajax('/login',{username:'admin',password:'123456'})
