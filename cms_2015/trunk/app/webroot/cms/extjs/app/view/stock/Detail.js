/**
 * 仓储管理 出入库单列表
 * */
Ext.define('CMS.view.stock.Detail', {

    //继承
    extend: 'CMS.view.common.Grid',

    //名称自定义
    alias: 'widget.stockdetail',

    //列处理
    features: [{
        ftype: 'summary',
        //合计栏显示的位置
        dock: 'bottom'
    }],

    //插件
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],

    //默认事件
    initComponent: function() {
        this.gridReset();
        this.callParent(arguments);
    },

    //重置订单明细
    gridReset: function() {
        this.getStore().removeAll();
        for (var i=0;i<10;i++) {
            this.getStore().add(Ext.create('CMS.model.StockDetail'));
        }
    },

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer',
        flex: 0.25
    }, {
        header: '商品编号',
        align: 'center',
        dataIndex: 'sku_sn',
        width: 250,
        editor: {
            xtype: 'combo',
            store: 'Product',
            displayField: 'sku_sn',
            valueField: 'sku_sn',
            pageSize: 10,
            //显示样式
            listConfig: {
                getInnerTpl: function() {
                    return '<div><span style="float:left">{sku_sn}</span><span>&nbsp;</span><span style="float:right">{goods_name}</span></div>';
                }
            },
            forceSelection: true,
            minChars: 1,
            //选择项
            onListSelectionChange: function(list, selectedRecords) {
                this.up('grid').fireEvent('setGoodsInfo', this, list, selectedRecords);
            }
        }
    }, {
        header: '商品名称',
        align: 'center',
        dataIndex: 'goods_name',
        flex: 1.5
    }, {
        header: '商品单价',
        dataIndex: 'price',
        align: 'center',
        editor: {
            xtype: 'numberfield',
            minValue: 0,
            onChange: function(price) {
                var record = this.up('grid').getSelectionModel().getSelection();
                record[0].data.amt = record[0].data.number * price;
            }
        },
        flex: 0.75,
        renderer: function(value, metadata, record, rowIndex) {
            value = (value * 1).toFixed(2);
            return value;
        }
    }, {
        header: '商品数量',
        align: 'center',
        dataIndex: 'number',
        allowDecimals : false,//不允许输入小数
        editor: {
            xtype: 'numberfield',
            minValue: 0,
            onChange: function(number) {
                var record = this.up('grid').getSelectionModel().getSelection();
                record[0].data.amt = record[0].data.price * number;
            }
        },
        flex: 0.5,
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return '总数：' + value;
        }
    }, {
        header: '小计',
        align: 'center',
        dataIndex: 'amt',
        flex: 0.85,
        renderer: function(value,metadata,record,rowIndex){
            value = (value * 1).toFixed(2);
            return value;
        },
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            value = (value * 1).toFixed(2);
            return '合计：' + value;
        }
    }, {
        header: '备注',
        align: 'center',
        dataIndex: 'remark',
        editor: {
            xtype: 'textfield'
        },
        flex: 0.75
    }],

    //事件监听
    listeners: {
        'cellcontextmenu': function(grid, column, columnIndex, record, row, rowIndex, e) {
            e.preventDefault();
            this.rightClick.showAt(e.getXY());
            this.rightClick.grid = grid;
            this.rightClick.rowIndex = rowIndex;
            this.rightClick.record = record;
        }
    },

    //鼠标右击事件
    rightClick: Ext.create('Ext.menu.Menu', {
        items : [{
            itemId: 'add',
            text: '插入行'
        }, {
            itemId: 'delete',
            text : '删除行'
        }],
        listeners: {
            click: function(obj, e) {
                switch (e.itemId) {
                    case 'add':
                        obj.grid.getStore().insert(obj.rowIndex + 1, Ext.create('CMS.model.StockDetail'));
                        break;
                    case 'delete':
                        if (obj.grid.getStore().data.items.length > 1) {
                            obj.grid.getStore().remove(obj.record);
                        } else {
                            Ext.Msg.show({
                                title: '系统提示',
                                msg: '订单明细不能为空',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.WARNING
                            });
                        }
                        break;
                }
                //刷新序号
                obj.grid.up('grid').getView().refresh()
            }
        }
    })
});