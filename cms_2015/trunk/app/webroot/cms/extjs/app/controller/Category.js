/**
 * 商品管理 商品分类列表控制器
 */
Ext.define('CMS.controller.Category', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用数据
    stores: [
        'Category'
    ],

    //调用视图
    views: [
        'category.Lists',
        'category.Edit'
    ],

    //应用程序加载完成之后，Viewport创建之前触发
    init: function() {
        this.control({
            'categorylists': {
                create: function() {
                    this.showEditDialog('categoryedit', '商品分类新增');
                },
                edit: function(record) {
                    this.showEditDialog('categoryedit', '商品分类修改', record);
                },
                delete: function(record) {
                    this.showDeleteDialog(record, this.getStore('Category'));
                }
            },
            'categoryedit': {
                save: function() {
                    this.saveData(this.getStore('Category'));
                }
            }
        });
    }
});