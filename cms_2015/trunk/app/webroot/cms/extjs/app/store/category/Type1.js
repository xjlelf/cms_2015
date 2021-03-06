/**
 * 商品管理 商品分类列表数据
 */
Ext.define('CMS.store.category.Type1', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.Category',

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/Category/lists?type=1'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            totalProperty: 'total'
        }
    }
});