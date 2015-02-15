/**
 * 系统管理 菜单管理模型
 */
Ext.define('CMS.model.Menu', {

    //继承
    extend: 'Ext.data.Model',

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