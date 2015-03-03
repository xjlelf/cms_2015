/**
 * 客户管理 客户列表
 * */
Ext.define('CMS.view.customer.Lists', {

    //继承
    extend: 'CMS.view.common.Grid',

    //名称自定义
    alias: 'widget.customerlists',

    //调用数据
    store: 'Customer',

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer',
        width: 40
    }, {
        header: '客户简称',
        dataIndex: 's_name',
        flex: 1,
        align: 'center'
    }, {
        header: '客户全称',
        dataIndex: 'name',
        flex: 2,
        align: 'center'
    }, {
        header: '联系人',
        dataIndex: 'man',
        flex: 1,
        align: 'center'
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
        tooltip: '新增客户',
        icon: ConstDefine.COMMON_ICONS_PATH + 'application_add.png',
        handler: function() {
            this.up('grid').fireEvent('create');
        }
    }, '-', {
        itemId: 'name',
        xtype: 'textfield',
        fieldLabel: '客户名称',
        labelWidth: 60
    }, {
        xtype: 'button',
        icon: ConstDefine.COMMON_ICONS_PATH + 'search.png',
        text: '搜索',
        handler: function() {
            var params = {
                'name': this.up().getComponent('name').getValue()
            }
            this.up('grid').reload(params);
        }
    }, '->', {
        xtype: 'button',
        icon: ConstDefine.COMMON_ICONS_PATH + 'doc_excel_table.png',
        text: '导出Excel',
        handler: function() {
            this.up('grid').excel_export();
        }
    }],

    //底部栏
    bbar: {
        xtype: 'commonpage',
        store: 'Customer'
    }
});