/**
 * 商品管理 商品分类管理编辑界面
 * */
Ext.define('CMS.view.category.Edit', {

    //继承
    extend: 'Ext.window.Window',

    //名称自定义
    alias: 'widget.categoryedit',

    //布局
    layout: 'fit',

    //关闭按钮
    closeAction: 'hide',

    //其他界面不可操作
    modal: true,

    //子项
    items: [{
        xtype: 'form',
        bodyPadding: 10,
        border: 0,
        defaults: {
            labelWidth: 80,
            width: 300
        },
        items: [{
            itemId: 'id',
            xtype: 'hidden',
            name: 'id'
        }, {
            xtype: 'numberfield',
            name: 'type',
            fieldLabel: '分类类型',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'category_name',
            fieldLabel: '分类名称',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'code',
            fieldLabel: '分类编码'
        }],

        buttons: [{
            text: '保存',
            formBind: true,
            disabled: true,
            handler: function() {
                this.up('window').fireEvent('save');
            }
        },{
            text: '取消',
            handler: function() {
                this.up('window').close();
            }
        }]
    }]
});