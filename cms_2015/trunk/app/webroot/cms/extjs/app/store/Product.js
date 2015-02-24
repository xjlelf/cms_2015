/**
 * 商品管理 商品列表数据
 */
Ext.define('CMS.store.Product', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.Product',

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/Products/lists',
            save: '/Products/save',
            delete: '/Products/delete/'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            totalProperty: 'total'
        }
    },

    pageSize: 20
});