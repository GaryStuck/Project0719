/**
 * @file:用于存储关键信息**/
import store from 'store';

const USER_KEY = 'user_key'
export default {
	/**@function:某些低版本浏览器不兼容**/
	saveUser(user) {
		// localStorage.setItem(USER_KEY,JSON.stringify(user))
		store.set(USER_KEY,user)
	},
	getUser() {
		// return JSON.parse(localStorage.getItem(USER_KEY)||'{}')
		return store.get(USER_KEY) || {}
	},
	removeUser(user) {
		// localStorage.removeItem(user)
		store.remove(USER_KEY)
	}
}