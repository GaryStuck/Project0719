import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import memoryUtils  from '../../utils/memoryUtils'

class Admin extends Component {

	render() {
		const user = memoryUtils.user;
		// 未登录跳转到登录界面
		if (!user._id||!user) {
			return <Redirect to='/login'/>
		}
			return (
					<div>
						HELLO {user.username}
					</div>
			);
	}
}

Admin.propTypes = {};

export default Admin;