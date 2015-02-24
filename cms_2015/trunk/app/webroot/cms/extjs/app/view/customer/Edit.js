/**
 * 客户管理 客户管理编辑界面
 * */
Ext.define('CMS.view.customer.Edit', {

    //继承
    extend: 'Ext.window.Window',

    //名称自定义
    alias: 'widget.customeredit',

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
            xtype: 'textfield',
            name: 'name',
            fieldLabel: '客户全称',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 's_name',
            fieldLabel: '客户简称'
        }, {
            xtype: 'textfield',
            name: 'man',
            fieldLabel: '联系人',
            allowBlank: false
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