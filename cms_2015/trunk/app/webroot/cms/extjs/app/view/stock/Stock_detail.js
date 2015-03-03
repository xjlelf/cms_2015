/**
 * 仓储管理 商品库存列表
 * */
Ext.define('CMS.view.stock.Stock_detail', {

    //继承
    extend: 'CMS.view.common.Grid',

    //名称自定义
    alias: 'widget.stockstock_detail',

    //默认事件
    initComponent: function() {
        var store = Ext.create('CMS.store.ProductStockDetail');
        this.store = store;
        this.bbar.store = store;
        this.callParent(arguments);
    },

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer',
        width: 40
    }, {
        header: '订单编号',
        dataIndex: 'order_sn',
        flex: 1,
        align: 'center'
    }, {
        header: '订单类型',
        dataIndex: 'type',
        renderer: function(value) {
            if (value == 1) {
                return '入库单';
            } else {
                return '出库单';
            }
        },
        flex: 1,
        align: 'center'
    }, {
        header: '客户名称',
        dataIndex: 'name',
        flex: 2,
        align: 'center'
    }, {
        header: '商品数量',
        dataIndex: 'numbers',
        flex: 1,
        align: 'center'
    }, {
        header: '操作',
        xtype: 'actioncolumn',
        align: 'center',
        items: [{
            icon: ConstDefine.COMMON_ICONS_PATH + 'application_view_list.png',
            tooltip: '订单详情',
            handler: function(grid, rowIndex) {
                var row = grid.getStore().getAt(rowIndex);
                grid.up('grid').fireEvent('detail', row);
            }
        }]
    }],

    //顶部栏
    tbar: [{
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
            };
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
        store: null
    }
});