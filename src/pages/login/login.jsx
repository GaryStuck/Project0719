/**
 * @file:登录界面**/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './login.less';
import logo from './images/logo.png'
import { Form, Icon, Input, Button, Spin, message } from 'antd';
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
/*@Item:不能写在import之前*/
const Item = Form.Item;

/*
* @class:登录页面
* */
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let {loading} = this.state;
		loading = true;
		this.setState({loading})
		this.props.form.validateFields(async (err, values) => {
			// loading = true;
			if (!err) {
				const {username, password} = values;
				let results = await reqLogin(username, password)
				const result = results.data;
				setTimeout(() => {
					if (results.status === 200 && result.status === 0) {

						message.success('登录成功');
						memoryUtils.user = result.data;
						// 存储用户名到storage中
						storageUtils.saveUser(result.data)
						//跳到管理界面
						loading = false;
						this.setState({loading})
						this.props.history.replace('/');
					} else {
						loading = false;
						this.setState({loading})
						message.error(result.msg)
					}
				}, 1000)
			} else {
				loading = false;
				this.setState({loading})
				message.error('校验失败')
			}
		});
		// const form = this.props.form;
		// const val = form.getFieldsValue(); //可以拿到每个输入框的值
		// console.log(val)
	}
	/*
	* @func:自定义校验密码*/
	validatePwd = (rule, val, cb) => {
		if (!val) {
			cb('密码不能为空,不允许出现空格')
		} else if (val.length < 4) {
			cb('密码必须大于四位')
		} else if (val.length > 20) {
			cb('密码不许超过20位')
		} else if (!/^[a-zA-Z0-9]+$/.test(val)) {
			cb('密码需由大小写数字组成')
		} else {
			cb()
		}
	}

	render() {
		const user = memoryUtils.user;
		if (user && user._id) {
			return <Redirect to='/'/>
		}
		//得到具强大对象的form
		const form = this.props.form;
		const {getFieldDecorator} = form;

		return (
				<div className="login">
					<header className="login-header">
						<div className="logo">
							<img src={logo} alt="logo" width="150" height="150"/>
							<span className="logo-title">Dino development</span>
						</div>
					</header>
					<section className="login-content">
						<h1 className="login-name">迪诺后台登陆</h1>
						<Form onSubmit={this.handleSubmit} className="login-form">
							<Item hasFeedback>
								{getFieldDecorator('username', {
									rules: [
										{required: true, whitespace: true, message: '此项不能为空!'},
										{min: 4, message: '必须大于等于 4 位'},
										{max: 11, message: '必须小于等于 12 位'},
										{pattern: /^[a-zA-Z0-9]+$/, message: '必须是英文、数字组成'}
									]
								})(
										<Input
												size={'large'}
												prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
												placeholder="管理员帐号"
										/>
								)}
							</Item>
							<Item hasFeedback>
								{getFieldDecorator('password', {
									rules: [
										{validator: this.validatePwd}
									]
								})(
										<Input
												size={'large'}
												prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
												type="password"
												placeholder="密码"
										/>
								)}
							</Item>
							<Item>
								<Spin spinning={this.state.loading}>
									<Button type="primary" htmlType="submit" className="login-form-button">
										立即登陆
									</Button>
								</Spin>
							</Item>
						</Form>
					</section>
				</div>
		)
	}
}

/*
* 高阶函数
* 高阶组件
* */
const WrapLogin = Form.create()(Login);

export default WrapLogin;

/*前台表单验证
* 收集表单输入的数据
* */