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
        name: 'order_sn',
        type: 'string'
    }, {
        name: 'product_id',
        type: 'int'
    }, {
        name: 'sku_sn',
        type: 'string'
    }, {
        name: 'goods_name',
        type: 'string'
    }, {
        name: 'price',
        type: 'float'
    }, {
        name: 'numbers',
        type: 'int'
    }, {
        name: 'stand',
        type: 'float'
    }, {
        name: 'weight',
        type: 'float'
    }, {
        name: 'amt',
        type: 'float'
    }, {
        name: 'remark',
        type: 'string'
    }]
});