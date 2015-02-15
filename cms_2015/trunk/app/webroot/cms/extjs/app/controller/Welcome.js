/**
 * 欢迎栏控制器
 */
Ext.define('CMS.controller.Welcome', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用数据
    stores: [
        'Menus'
    ],

    //调用视图
    views: [
        'welcome.Index',
        'welcome.MenusList'
    ],

    //应用程序加载完成之后，Viewport创建之前触发
    init: function() {
        this.control({
            'menuslist': {
                itemmousedown: this.createPanel
            }
        });
    },

    //Viewport创建之后触发
    onLaunch: function() {
        //判断URL中是否有报表名字
        var arr = location.href.split('#!/');
        var me = this;
        var title = decodeURI(arr[1]);
        if (title == '菜单管理') {
            me.portPanel('/system/menu/lists', title, Ext.getCmp('main'));
        } else {
            if (title) {
                Ext.Ajax.request({
                    params: {
                        'text': title
                    },
                    url: '/Menus/getUrl',
                    success: function(response) {
                        var json = Ext.JSON.decode(response.responseText);
                        me.portPanel(json.url, title, Ext.getCmp('main'));
                    }
                })
            }
        }
    },

    //创建Panel
    createPanel: function(selModel, record) {
        var arr = location.href.split('#!/');
        location.href = arr[0] + '#!/' + record.get('text');
        if (record.get('leaf')) {
            this.portPanel(record.get('url'), record.get('text'));
        }
    },

    //输出Panel
    portPanel: function(url, title) {
        var panel = this.getPanel(url);
        var controller = this.getExtController(url);
        if (controller) {
            try {
                c = this.getController(controller);
                this.showPanel(panel, title, Ext.getCmp('main'));
            } catch(e) {
                this.showPanel(null, title, Ext.getCmp('main'));
            }
        }
    }
});