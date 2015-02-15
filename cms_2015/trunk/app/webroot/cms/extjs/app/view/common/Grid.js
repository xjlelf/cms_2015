/**
 * grid公用类
 * */
Ext.define('CMS.view.common.Grid', {

    //继承
    extend: 'Ext.grid.Panel',

    //名称自定义
    alias: 'widget.commongrid',

    //列宽自适应
    forceFit: true,

    viewConfig: {
        enableTextSelection: true //可以复制单元格文字
    },

    //重新载入
    reload: function(params) {
        var me = this,
            store = me.getStore();
        //分页时记住搜索条件
        store.proxy.extraParams = params;
        store.reload();
    }
});