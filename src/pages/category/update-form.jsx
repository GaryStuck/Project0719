import React, { Component } from 'react'
import { Form, Icon, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item

class UpdateForm extends Component {

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  //将值通过调用函数传递给父组件
  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {categoryName} = this.props;
    return (
        <Form>
          <Item>
            {
              getFieldDecorator('categoryName', {
                initialValue: categoryName,
              })(
                  <Input
                      prefix={<Icon type="form"
                                    style={{color: 'rgba(0,0,0,.25)'}}/>}
                      autoComplete="false" placeholder="请输入分类名称"/>,
              )
            }
          </Item>
        </Form>
    )
  }
}

const UpdateForms = Form.create()(UpdateForm)
export default UpdateForms