/*
* @file:修改默认配置
* */
const {override, fixBabelImports, addLessLoader} = require('customize-cra');

// 针对antd按需打包
module.exports = override(
		fixBabelImports('import', {
			libraryName: 'antd',
			libraryDirectory: 'es',
			style: true  //自动打包相关样式
		}),
		addLessLoader({
			javascriptEnabled: true,
			modifyVars: {'@primary-color': '#2a88da'}
		})
)
