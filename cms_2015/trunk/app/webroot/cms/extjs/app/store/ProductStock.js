/**
 * 仓储管理 商品库存列表数据
 */
Ext.define('CMS.store.ProductStock', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.ProductStock',

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/ProductStocks/lists',
            save: '/ProductStocks/save',
            delete: '/ProductStocks/delete/'
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