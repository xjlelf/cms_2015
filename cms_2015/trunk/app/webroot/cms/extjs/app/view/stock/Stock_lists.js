/**
 * 仓储管理 商品库存列表
 * */
Ext.define('CMS.view.stock.Stock_lists', {

    //继承
    extend: 'CMS.view.common.Grid',

    //名称自定义
    alias: 'widget.stockstock_lists',

    //调用数据
    store: 'ProductStock',

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer',
        width: 40
    }, {
        header: '商品编号',
        dataIndex: 'sku_sn',
        flex: 1,
        align: 'center'
    }, {
        header: '商品名称',
        dataIndex: 'goods_name',
        flex: 2,
        align: 'center'
    }, {
        header: '商品规格（kg/桶）',
        dataIndex: 'stand',
        flex: 1,
        align: 'center',
        renderer: function(value) {
            return value.toFixed(2);
        }
    }, {
        header: '即时库存',
        dataIndex: 'qty',
        flex: 1,
        align: 'center'
    }],

    //顶部栏
    tbar: [{
        itemId: 'sku_sn',
        xtype: 'textfield',
        fieldLabel: '商品编号',
        labelWidth: 60
    }, {
        xtype: 'button',
        icon: ConstDefine.COMMON_ICONS_PATH + 'search.png',
        text: '搜索',
        handler: function() {
            var params = {
                'sku_sn': this.up().getComponent('sku_sn').getValue()
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
        store: 'ProductStock'
    }
});