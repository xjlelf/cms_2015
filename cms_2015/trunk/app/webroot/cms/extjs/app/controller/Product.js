/**
 * 商品管理 商品列表控制器
 */
Ext.define('CMS.controller.Product', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用数据
    stores: [
        'Product',
        'category.Type1',
        'category.Type2'
    ],

    //调用视图
    views: [
        'product.Lists',
        'product.Edit'
    ],

    //应用程序加载完成之后，Viewport创建之前触发
    init: function() {
        this.control({
            'productlists': {
                create: function() {
                    this.showEditDialog('productedit', '商品新增');
                },
                edit: function(record) {
                    this.getStore('category.Type1').load();
                    this.getStore('category.Type2').load();
                    this.showEditDialog('productedit', '商品修改', record);
                },
                delete: function(record) {
                    this.showDeleteDialog(record, this.getStore('Product'));
                }
            },
            'productedit': {
                save: function() {
                    this.saveData(this.getStore('Product'));
                }
            }
        });
    }
});