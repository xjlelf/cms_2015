/**
 * 系统管理 菜单管理控制器
 */
Ext.define('CMS.controller.system.Menu', {

    //继承
    extend: 'CMS.controller.Admin',

    //数据
    stores: [
        'system.Menu'
    ],

    //调用视图
    views: [
        'system.menu.Lists',
        'system.menu.Edit'
    ],

    //应用程序加载完成之后，Viewport创建之前触发
    init: function() {
        this.control({
            'systemmenulists': {
                create: function() {
                    this.showEditDialog('systemmenuedit', '菜单新增');
                },
                edit: function(record) {
                    this.showEditDialog('systemmenuedit', '菜单修改', record);
                },
                delete: function(record) {
                    this.showDeleteDialog(record, this.getStore('system.Menu'));
                }
            },
            'systemmenuedit': {
                save: function() {
                    this.saveData(this.getStore('system.Menu'));
                }
            }
        });
    }
});