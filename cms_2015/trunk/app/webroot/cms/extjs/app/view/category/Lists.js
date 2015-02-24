/**
 * 商品管理 商品分类列表
 * */
Ext.define('CMS.view.category.Lists', {

    //继承
    extend: 'CMS.view.common.Grid',

    //名称自定义
    alias: 'widget.categorylists',

    //调用数据
    store: 'Category',

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer'
    }, {
        header: '分类类型',
        dataIndex: 'type'
    }, {
        header: '分类名称',
        dataIndex: 'category_name'
    }, {
        header: '分类编码',
        dataIndex: 'code'
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
        tooltip: '新增商品分类',
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