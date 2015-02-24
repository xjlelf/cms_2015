/**
 * 商品管理 商品列表模型
 */
Ext.define('CMS.model.Product', {

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
        name: 'original_price',
        type: 'float'
    }, {
        name: 'stand',
        type: 'float'
    }, {
        name: 'cate_1',
        type: 'string'
    }, {
        name: 'cate_2',
        type: 'string'
    }, {
        name: 'color_code',
        type: 'string'
    }]
});