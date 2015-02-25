/**
 * 仓储管理 出入库列表数据
 */
Ext.define('CMS.store.Stock', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.Stock',

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/Stocks/lists',
            save: '/Stocks/save',
            delete: '/Stocks/delete/'
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