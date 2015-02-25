/**
 * 仓储管理 出入库单编辑界面
 * */
Ext.define('CMS.view.stock.Edit', {

    //继承
    extend: 'Ext.panel.Panel',

    //名称自定义
    alias: 'widget.stockedit',

    //布局
    layout: 'fit',

    //子项
    items: [{
        xtype: 'form',
        bodyPadding: 5,
        border: 0,
        defaults: {
            labelWidth: 80,
            width: 300
        },
        layout: {
            type: 'table',
            columns: 3
        },
        items: [{
            itemId: 'id',
            xtype: 'hidden',
            name: 'id'
        }, {
            xtype: 'textfield',
            name: 'order_sn',
            fieldLabel: '订单编号',
            allowBlank: false
        }, {
            xtype: 'combo',
            name: 'customer',
            fieldLabel: '客户',
            store: 'Customer',
            displayField: 's_name',
            valueField: 'id',
            editable: false,
            allowBlank: false
        }, {
            xtype: 'datefield',
            name: 'stock_dt',
            format: 'Y-m-d',
            fieldLabel: '出入库时间',
            allowBlank: false
        }, {
            xtype: 'stockdetail',
            //调用数据
            store: Ext.create('CMS.store.StockDetail'),
            colspan: 3,
            width: Ext.getCmp('main').getWidth() - 10,
            height: 450,
            title: '出入库明细'
        }],

        buttons: [{
            text: '保存',
            formBind: true,
            disabled: true,
            handler: function() {
                this.up('window').fireEvent('save');
            }
        },{
            text: '取消',
            handler: function() {
                this.up('window').close();
            }
        }]
    }]
});