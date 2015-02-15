/**
 * 系统菜单栏数据
 */
Ext.define('CMS.store.Menus', {

    //继承
    extend: 'Ext.data.TreeStore',

    //默认目录
    root: {
        id: 0,
        text: '系统菜单',
        children: [{
            id: -1,
            text: '系统管理',
            children: [{
                id: -2,
                text: '菜单管理',
                url: '/system/menu/lists',
                leaf: true
            }]
        }]
    },

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/Menus/row'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },

    //字段
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'text',
        type: 'string'
    }, {
        name: 'url',
        type: 'string'
    }]
});