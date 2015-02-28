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

    //默认事件
    initComponent: function() {
        this.items[0].items[4] = Ext.create('CMS.view.stock.Detail', {
            itemId: 'detail',
            //调用数据
            store: Ext.create('CMS.store.StockDetail'),
            colspan: 3,
            width: Ext.getCmp('main').getWidth() - 10,
            height: 450,
            title: '出入库明细',
            //插件
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ]
        });
        this.callParent(arguments);
    },

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
            itemId: 'detail',
            xtype: 'stockdetail',
            //调用数据
            store: Ext.create('CMS.store.StockDetail'),
            colspan: 3,
            width: Ext.getCmp('main').getWidth() - 10,
            height: 450,
            title: '出入库明细'
        }, {
            itemId: 'real_detail',
            xtype: 'hidden',
            name: 'detail'
        }, {
            itemId: 'type',
            xtype: 'hidden',
            name: 'type'
        }],

        buttons: [{
            text: '保存',
            icon: ConstDefine.COMMON_ICONS_PATH + 'disk.png',
            formBind: true,
            disabled: true,
            handler: function() {
                var form = this.up('panel'),
                    grid = form.getComponent('detail'),
                    store = grid.getStore();
                var jsonData = Ext.encode(Ext.pluck(store.data.items, 'data'));
                form.getComponent('real_detail').setValue(jsonData);
                if (form.up('panel').itemId == 'stockin') {
                    form.getComponent('type').setValue(1);
                } else if (form.up('panel').itemId == 'stockout') {
                    form.getComponent('type').setValue(2);
                }
                form.up('panel').fireEvent('save', form);
            }
        }]
    }]
});