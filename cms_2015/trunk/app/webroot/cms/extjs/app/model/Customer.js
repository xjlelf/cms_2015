/**
 * 客户管理 客户列表模型
 */
Ext.define('CMS.model.Customer', {

    //继承
    extend: 'Ext.data.Model',

    //字段
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 's_name',
        type: 'string'
    }, {
        name: 'man',
        type: 'string'
    }]
});