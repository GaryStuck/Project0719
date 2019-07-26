/**
 * @file:react根组件
 * **/

import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends Component {

	render() {
		return (
				<BrowserRouter>
					<Switch> {/*switch一次只能显示一个路由*/}
						<Route path='/login' component={Login}/>
						<Route path='/' component={Admin}/>
					</Switch>
				</BrowserRouter>
		);
	}
}
