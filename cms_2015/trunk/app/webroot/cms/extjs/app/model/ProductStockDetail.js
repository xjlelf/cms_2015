/**
 * 仓储管理 商品库存明细模型
 */
Ext.define('CMS.model.ProductStockDetail', {

    //继承
    extend: 'Ext.data.Model',

    //字段
    fields: [{
        name: 'order_sn',
        type: 'string'
    }, {
        name: 'type',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'numbers',
        type: 'int'
    }, {
        name: 'customer',
        type: 'int'
    }, {
        name: 'stock_dt',
        type: 'string'
    }]
});