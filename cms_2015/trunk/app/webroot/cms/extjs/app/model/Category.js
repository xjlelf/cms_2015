/**
 * 商品管理 商品分类列表模型
 */
Ext.define('CMS.model.Category', {

    //继承
    extend: 'Ext.data.Model',

    //字段
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'type',
        type: 'int'
    }, {
        name: 'category_name',
        type: 'string'
    }, {
        name: 'code',
        type: 'string'
    }]
});