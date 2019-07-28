import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, message } from 'antd'
import { reqDeleteImg } from '../../api'
import { BASE_IMG_URL } from '../../utils/constants'

/**图片上传组件**/

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

class PicturesWall extends Component {

  //接收父组件传入的值
  static propTypes = {
    imgs: PropTypes.array,
  }
  state = {
    previewVisible: false,
    previewImage: '',//大图URL
    fileList: [],//图片数组
  }

  constructor(props) {
    super(props)
    // this.pw = React.createRef()
    let fileList = []
    //传入的图片
    const {imgs} = this.props
    console.log(imgs)
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: 'done',
        url: BASE_IMG_URL + img,
      }))
      //初始化状态
      this.state = {
        previewVisible: false,
        previewImage: '',
        fileList
      }
    }

  }

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }

  handleChange = async ({file, fileList}) => {
    console.log('fileList', fileList)
    //及时更新图片filelist状态
    if (file.status === 'done') {
      const result = file.response
      if (result.status === 0) {
        message.success('图片上传成功')
        const {name, url} = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('图片上传失败')
      }
    } else if (file.status === 'removed') {
      const data = await reqDeleteImg(file.name)
      console.log(data)
      if (data.data.status === 0) {
        message.warning('图片删除成功')
      } else {
        message.error('删除图片失败')
      }
    }
    //在操作（上传、删除操作时，更新fileList状态）
    this.setState({fileList},
    )
  }
  /*获取所有已上传的文件名的数组*/
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  render() {
    const {previewVisible, previewImage, fileList} = this.state
    const uploadButton = (
        <div>
          <Icon type="plus"/>
          <div className="ant-upload-text">Upload</div>
        </div>
    )
    return (
        <div className="clearfix">
          <Upload
              action="/manage/img/upload"
              accept='images/*' //只接收的图片格式
              name={'image'} //请求参数名
              listType="picture-card"//卡片样式
              fileList={fileList}//所有已上传图片文件对象的数组
              onPreview={this.handlePreview}
              onChange={this.handleChange}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null}
                 onCancel={this.handleCancel}>
            <img alt="example" style={{width: '100%'}} src={previewImage}/>
          </Modal>
        </div>
    )
  }
}

export default PicturesWall