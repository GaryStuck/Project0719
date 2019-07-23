import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header'

/**@implements:路由组件**/
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Pie from '../charts/pie'
import Line from '../charts/line'
import Bar from '../charts/bar'
import Order from '../order/order'

const {Footer, Sider, Content} = Layout;

class Admin extends Component {

	render() {
		const user = memoryUtils.user;
		// 未登录跳转到登录界面
		if (!user._id || !user) {
			return <Redirect to='/login'/>
		}

		return (
				<Layout style={{height: '100%'}}>
					<Sider>
						<LeftNav/>
					</Sider>
					<Layout>
						<Header/>
						<Content style={{margin:'20px',background:'#fff',boxShadow: '10px 10px 5px #bfbfbf'}}>
							<Switch>
								<Route path='/home' component={Home}/>
								<Route path='/category' component={Category}/>
								<Route path='/product' component={Product}/>
								<Route path='/role' component={Role}/>
								<Route path='/user' component={User}/>
								<Route path='/charts/bar' component={Bar}/>
								<Route path='/charts/pie' component={Pie}/>
								<Route path='/charts/line' component={Line}/>
								<Route path='/order' component={Order}/>
								<Redirect to='/home'/>
							</Switch>
						</Content>
						<Footer>Footer</Footer>
					</Layout>
				</Layout>
		);
	}
}

Admin.propTypes = {};

export default Admin;