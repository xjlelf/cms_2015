/**
 * 仓储管理 商品库存列表模型
 */
Ext.define('CMS.model.ProductStock', {

    //继承
    extend: 'Ext.data.Model',

    //字段
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'sku_sn',
        type: 'string'
    }, {
        name: 'goods_name',
        type: 'string'
    }, {
        name: 'product_id',
        type: 'int'
    }, {
        name: 'stand',
        type: 'float'
    }, {
        name: 'qty',
        type: 'int'
    }, {
        name: 'real_qty',
        type: 'int'
    }]
});