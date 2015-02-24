/**
 * 商品管理 商品管理编辑界面
 * */
Ext.define('CMS.view.product.Edit', {

    //继承
    extend: 'Ext.window.Window',

    //名称自定义
    alias: 'widget.productedit',

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
            xtype: 'combo',
            name: 'cate_1',
            fieldLabel: '商品分类1',
            store: 'category.Type1',
            displayField: 'category_name',
            valueField: 'code',
            editable: false,
            allowBlank: false
        }, {
            xtype: 'combo',
            name: 'cate_2',
            fieldLabel: '商品分类2',
            store: 'category.Type2',
            displayField: 'category_name',
            valueField: 'code',
            editable: false,
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'color_code',
            fieldLabel: '颜色首字母',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'goods_name',
            fieldLabel: '商品名称',
            allowBlank: false
        }, {
            xtype: 'numberfield',
            name: 'original_price',
            fieldLabel: '商品成本价'
        }, {
            xtype: 'numberfield',
            name: 'stand',
            fieldLabel: '商品规格（kg/桶）',
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