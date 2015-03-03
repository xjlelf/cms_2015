/**
 * 仓储管理 商品库存明细数据
 */
Ext.define('CMS.store.ProductStockDetail', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.ProductStockDetail',

    proxy: {
        type: 'ajax',
        api: {
            read: '/Stocks/product_stock_detail'
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