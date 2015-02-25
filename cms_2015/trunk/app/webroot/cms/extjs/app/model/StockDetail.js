/**
 * 仓储管理 出入库明细模型
 */
Ext.define('CMS.model.StockDetail', {

    //继承
    extend: 'Ext.data.Model',

    //字段
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'order_id',
        type: 'int'
    }, {
        name: 'product_id',
        type: 'int'
    }, {
        name: 'sku_sn',
        type: 'string'
    }, {
        name: 'product_name',
        type: 'string'
    }, {
        name: 'price',
        type: 'float'
    }, {
        name: 'number',
        type: 'int'
    }, {
        name: 'amt',
        type: 'float'
    }, {
        name: 'remark',
        type: 'string'
    }]
});