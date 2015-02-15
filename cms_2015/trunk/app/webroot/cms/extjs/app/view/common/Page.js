/**
 * 分页栏
 */
Ext.define('CMS.view.common.Page', {

	//继承
	extend: 'Ext.PagingToolbar',

	//名称自定义
	alias: 'widget.commonpage',

	displayInfo: true,

	//页数显示格式
	displayMsg: '显示 {0} - {1} 条，共计 {2} 条',

	//没有数据显示文字
	emptyMsg: "没有数据"
});