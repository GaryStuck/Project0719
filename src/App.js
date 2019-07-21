/**
 * @file:react根组件
 * **/

import React, { Component } from 'react'
import { Button, message } from 'antd';
// import 'antd/dist/antd.css';

export default class App extends Component {
	handleClick= () => {
		message.info('This is a normal message');
	}
	render() {
		return (
				<div>
					<Button onClick={this.handleClick} type="primary">Primary</Button>
				</div>
		);
	}
}
