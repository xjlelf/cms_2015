/**
 * 客户管理 客户列表数据
 */
Ext.define('CMS.store.Customer', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.Customer',

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/Customers/lists',
            save: '/Customers/save',
            delete: '/Customers/delete/'
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