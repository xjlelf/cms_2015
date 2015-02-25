/**
 * 客户管理 客户列表控制器
 */
Ext.define('CMS.controller.Customer', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用数据
    stores: [
        'Customer'
    ],

    //调用视图
    views: [
        'customer.Lists',
        'customer.Edit'
    ],

    //应用程序加载完成之后，Viewport创建之前触发
    init: function() {
        this.control({
            'customerlists': {
                create: function() {
                    this.showEditDialog('customeredit', '客户新增');
                },
                edit: function(record) {
                    this.showEditDialog('customeredit', '客户修改', record);
                },
                delete: function(record) {
                    this.showDeleteDialog(record, this.getStore('Customer'));
                }
            },
            'customeredit': {
                save: function() {
                    this.saveData(this.getStore('Customer'));
                }
            }
        });
    }
});