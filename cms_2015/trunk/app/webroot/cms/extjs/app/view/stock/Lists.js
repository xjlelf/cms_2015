/**
 * 仓储管理 出入库单列表
 * */
Ext.define('CMS.view.stock.Lists', {

    //继承
    extend: 'CMS.view.common.Grid',

    //名称自定义
    alias: 'widget.stocklists',

    //调用数据
    store: 'Stock',

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer',
        width: 40
    }, {
        header: '出入库单编号',
        dataIndex: 'order_sn'
    }, {
        header: '客户名称',
        dataIndex: 'name'
    }, {
        header: '出入库时间',
        dataIndex: 'stock_dt'
    }, {
        header: '订单总价',
        dataIndex: 'total_price',
        renderer: function(value) {
            return value.toFixed(2);
        }
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
        tooltip: '新增订单',
        icon: ConstDefine.COMMON_ICONS_PATH + 'application_add.png',
        menu: {
            items: [{
                text: '入库单',
                handler: function() {
                    this.up('grid').fireEvent('create', '入库单', 'stockin');
                }
            }, {
                text: '出库单',
                handler: function() {
                    this.up('grid').fireEvent('create', '出库单', 'stockout');
                }
            }]
        }
    }, '-', {
        itemId: 'order_sn',
        xtype: 'textfield',
        fieldLabel: '订单编号',
        labelWidth: 60
    }, {
        xtype: 'button',
        icon: ConstDefine.COMMON_ICONS_PATH + 'search.png',
        text: '搜索',
        handler: function() {
            var params = {
                'order_sn': this.up().getComponent('order_sn').getValue()
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
        store: 'Stock'
    }
});