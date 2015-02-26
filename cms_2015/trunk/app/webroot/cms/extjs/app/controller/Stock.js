/**
 * 仓储管理 出入库列表控制器
 */
Ext.define('CMS.controller.Stock', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用数据
    stores: [
        'Stock',
        'Customer',
        'Product',
        'ProductStock'
    ],

    //调用视图
    views: [
        'stock.Lists',
        'stock.Edit',
        'stock.Detail',
        'stock.Stock_lists'
    ],

    //应用程序加载完成之后，Viewport创建之前触发
    init: function() {
        this.control({
            'stocklists': {
                create: function(title, type) {
                    this.showPanel('stockedit', title, Ext.getCmp('main'), type);
                }
            },
            'stockdetail': {
                setGoodsInfo: function(productList, list, selectedRecords) {
                    this.setGoodsInfo(productList, list, selectedRecords);
                }
            },
            'stockedit': {
                save: function(form) {
                    var store = this.getStore('Stock'),
                        url = store.proxy.api.save;
                    this.formSubmit(form, url, function() {
                        form.up('panel').close();
                        Ext.Msg.show({
                            title: '系统提示',
                            msg: '保存成功',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                        store.load();
                    });
                }
            }
        });
    },

    //设置产品信息
    setGoodsInfo: function(productList, list, selectedRecords) {
        var me = productList,
            isMulti = me.multiSelect,
            hasRecords = selectedRecords.length > 0;
        if (!me.ignoreSelection && me.isExpanded) {
            if (!isMulti) {
                Ext.defer(me.collapse, 1, me);
            }
            if (isMulti || hasRecords) {
                me.setValue(selectedRecords, false);
            }
            if (hasRecords) {
                var store = me.up('grid').getStore();
                var record = me.up('grid').getSelectionModel().getSelection();
                var update_flag = true;
                for (var item in store.data.items) {
                    if (selectedRecords[0].data.sku_sn == store.data.items[item].data.sku_sn) {
                        update_flag = false;
                        break;
                    }
                }
                if (update_flag) {
                    selectedRecords[0].data.product_id = selectedRecords[0].data.id;
                    selectedRecords[0].data.price = selectedRecords[0].data.original_price;
                    selectedRecords[0].data.id = 0;
                    selectedRecords[0].data.amt = record[0].data.numbers * selectedRecords[0].data.price;
                    record[0].set(selectedRecords[0].data);
                    me.fireEvent('select', me, selectedRecords);
                } else {
                    Ext.Msg.show({
                        title: '系统提示',
                        msg: '此产品已经在订单中',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING
                    });
                }
            }
            me.inputEl.focus();
        }
    }
});