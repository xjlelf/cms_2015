/**
 * 系统管理 菜单管理数据
 */
Ext.define('CMS.store.system.Menu', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.Menu',

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/Menus/lists',
            save: '/Menus/save',
            delete: '/Menus/delete/'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            totalProperty: 'total'
        }
    }
});