/**
 * 系统管理 菜单管理列表
 * */
Ext.define('CMS.view.system.menu.Lists', {

    //继承
    extend: 'CMS.view.common.Grid',

    //名称自定义
    alias: 'widget.systemmenulists',

    //调用数据
    store: 'system.Menu',

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer'
    }, {
        header: '菜单ID',
        dataIndex: 'id'
    }, {
        header: '菜单名称',
        dataIndex: 'text'
    }, {
        header: '链接地址',
        dataIndex: 'url'
    }, {
        header: '操作',
        xtype: 'actioncolumn',
        align: 'center',
        items: [{
            icon: ConstDefine.COMMON_ICONS_PATH + 'application_edit.png',
            tooltip: '修改',
            handler: function(grid, rowIndex) {
                var row = grid.getStore().getAt(rowIndex);
                grid.up('grid').fireEvent('edit', row);
            }
        }, '->', {
            icon: ConstDefine.COMMON_ICONS_PATH + 'application_delete.png',
            tooltip: '删除',
            handler: function(grid, rowIndex) {
                var row = grid.getStore().getAt(rowIndex);
                grid.up('grid').fireEvent('delete', row);
            }
        }]
    }],

    //顶部栏
    tbar: [{
        xtype: 'button',
        text: '新增',
        tooltip: '新增账号',
        icon: ConstDefine.COMMON_ICONS_PATH + 'application_add.png',
        handler: function() {
            this.up('grid').fireEvent('create');
        }
    }, '->', {
        xtype: 'button',
        icon: ConstDefine.COMMON_ICONS_PATH + 'doc_excel_table.png',
        text: '导出Excel',
        handler: function() {
            this.up('grid').excel_export();
        }
    }]
});