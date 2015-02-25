/**
 * 仓储管理 出入库列表模型
 */
Ext.define('CMS.model.Stock', {

    //继承
    extend: 'Ext.data.Model',

    //字段
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'order_sn',
        type: 'string'
    }, {
        name: 'stock_dt',
        type: 'string'
    }, {
        name: 'customer_id',
        type: 'int'
    }, {
        name: 'customer',
        type: 'string'
    }, {
        name: 'order_price',
        type: 'float'
    }]
});