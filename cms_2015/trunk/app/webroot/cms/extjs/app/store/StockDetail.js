/**
 * 仓储管理 出入库明细数据
 */
Ext.define('CMS.store.StockDetail', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.StockDetail',

    proxy: {
        type: 'ajax',
        api: {
            read: '/Stocks/detail_lists'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            totalProperty: 'total'
        }
    }
});