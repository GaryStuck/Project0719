import React, { Component } from 'react';
import './login.less';
import logo from './images/logo.png'
import { Form, Icon, Input, Button, Spin } from 'antd';

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
/*			let {loading} = this.state;
				loading = true;
				this.setState({loading})

				*/
	handleSubmit = (e) => {
		e.preventDefault();
		const form = this.props.form;
		const val = form.getFieldsValue();
		console.log(val)
	}

	render() {

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
							<Item>
								{getFieldDecorator('username', {
									rules: [{required: true, message: '帐号错误!'}]
								})(
										<Input
												size={'large'}
												prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
												placeholder="管理员帐号"
										/>
								)}
							</Item>
							<Item>
								{getFieldDecorator('password', {
									rules: [{required: true, message: '账号或密码错误!'}]
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