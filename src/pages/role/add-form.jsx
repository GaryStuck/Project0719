import React, { Component } from 'react'
import { Form, Icon, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item

class AddForm extends Component {
  
  static propTypes = {
    setForm: PropTypes.func.isRequired,
  }
  
  componentWillMount() {
    this.props.setForm(this.props.form)
  }
  
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Form autoComplete='off'>
        <Item>
          {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules: [
                {required: true, message: '内容不能为空'},
              ],
            })(
              <Input
                prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="请输入角色名"/>,
            )
          }
        </Item>
      </Form>
    )
  }
}

const WrapForm = Form.create()(AddForm)
export default WrapForm