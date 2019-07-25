/**
 * @file:商品主界面**/

import React, { Component } from 'react';
import { Switch,Route,Redirect } from 'react-router-dom'
import ProductHome from './home'
import Detail from './detail'
import ProductAddUpdate from './add-product'
import './product.less'


class Product extends Component {
	render() {
		return (
				<Switch>
					<Route path='/product' component={ProductHome} exact />
					<Route path='/product/detail' component={Detail} />
					<Route path='/product/addupdate' component={ProductAddUpdate} />
					<Redirect to='/product' />
				</Switch>
		);
	}
}

export default Product;