/**
 * 商品管理 商品列表
 * */
Ext.define('CMS.view.product.Lists', {

    //继承
    extend: 'CMS.view.common.Grid',

    //名称自定义
    alias: 'widget.productlists',

    //调用数据
    store: 'Product',

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer',
        width: 40
    }, {
        header: '商品编号',
        dataIndex: 'sku_sn'
    }, {
        header: '商品名称',
        dataIndex: 'goods_name'
    }, {
        header: '商品成本价',
        dataIndex: 'original_price'
    }, {
        header: '商品规格（kg/桶）',
        dataIndex: 'stand'
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
        tooltip: '新增商品',
        icon: ConstDefine.COMMON_ICONS_PATH + 'application_add.png',
        handler: function() {
            this.up('grid').fireEvent('create');
        }
    }, '-', {
        itemId: 'sku_sn',
        xtype: 'textfield',
        fieldLabel: '商品编号',
        labelWidth: 60
    }, {
        itemId: 'cate_1',
        xtype: 'combo',
        store: 'category.Type1',
        fieldLabel: '类型1',
        displayField: 'category_name',
        valueField: 'code',
        labelWidth: 40
    }, {
        itemId: 'cate_2',
        xtype: 'combo',
        store: 'category.Type2',
        fieldLabel: '类型2',
        displayField: 'category_name',
        valueField: 'code',
        labelWidth: 40
    }, {
        xtype: 'button',
        icon: ConstDefine.COMMON_ICONS_PATH + 'search.png',
        text: '搜索',
        handler: function() {
            var params = {
                'sku_sn': this.up().getComponent('sku_sn').getValue(),
                'cate_1': this.up().getComponent('cate_1').getValue(),
                'cate_2': this.up().getComponent('cate_2').getValue()
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
        store: 'Product'
    }
});