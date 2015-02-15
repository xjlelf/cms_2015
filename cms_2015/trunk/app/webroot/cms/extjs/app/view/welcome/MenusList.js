/**
 * 菜单一栏
 */
Ext.define('CMS.view.welcome.MenusList', {

    //继承
    extend: 'Ext.tree.Panel',

    //名称自定义
    alias: 'widget.menuslist',

    //调用数据
    store: 'Menus',

    //是否显示根目录
    rootVisible: false,

    //显示小箭头
	useArrows: true
});