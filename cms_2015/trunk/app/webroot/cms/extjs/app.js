/**
 * ExtJs入口文件
 * */
Ext.require('/cms.extjs.app.config.constdefine');
var ConstDefine = Ext.create('/cms.extjs.app.config.constdefine');

/**
* 每次请求判断是否被限制
* */
Ext.Ajax.on('requestexception', function(conn, response, options, eOpts) {
    if (response.status == 403) {
        Ext.Msg.show({
            title: '系统提示',
            msg: '您还未登录，请重新登录',
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.WARNING,
            fn: function() {
                window.location = '/';
            }
        });
    } else if (response.status == 500) {
        Ext.Msg.show({
            title: '系统提示',
            msg: '请求发生错误，请联系技术人员',
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    }

});
Ext.application({

    //定义命名空间的名字
    name: 'CMS',

    //指定核心代码文件夹
    appFolder: '/cms/extjs/app',

    //默认调用菜单控制器
    controllers: [
        'Admin',
        'Welcome'
    ],

    //默认调用渲染
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                xtype: 'welcomeindex'
            }]
        });
    }
});

//重写图表的标签显示
Ext.chart.LegendItem.prototype.getLabelText = function() {
    var me = this, series = me.series, idx = me.yFieldIndex;

    function getSeriesProp(name) {
        var val = series[name];
        return (Ext.isArray(val) ? val[idx] : val);
    }

    return getSeriesProp('dispalyField') || getSeriesProp('yField');
};

//增加gird方法，导出整理数据方法
Ext.override(Ext.grid.GridPanel, {

    getContentStr: function(grid) {
        //数据列
        var dataColumns = grid.columns;
        //所有列
        var headerColumns = grid.columnManager.headerCt.getOwnerHeaderCt().items.items;
        var ExtStore = grid.store;
        var store = Ext.create('Ext.data.Store', {
            //调用模型
            model: ExtStore.model
        });
        var params = ExtStore.proxy.extraParams;
        Ext.Ajax.request({
            url: ExtStore.proxy.api.read,
            async: false,
            params: params,
            success : function(response) {
                var json = Ext.JSON.decode(response.responseText);
                store.loadData(json.data);
            },
            method: 'get'
        });

        var isMoreHeader = false;

        //判断是否有表头组
        if (dataColumns.length != headerColumns.length) {
            var SecondStr = '<tr>';
            isMoreHeader = true;
        }
        var headerStr = '<tr>';

        for(var i in headerColumns) {

            //只取显示的列和非序号列
            if (!headerColumns[i].isHidden() && headerColumns[i].xtype != 'rownumberer' && (headerColumns[i].xtype != 'actioncolumn' || headerColumns[i].isDownload)) {
                var length = 0;
                if (headerColumns[i].items.items) {
                    length = headerColumns[i].items.items.length;
                }
                if (length > 0) {
                    var columns = headerColumns[i].items.items;
                    var length = 0;
                    for (var z in columns) {
                        //只取显示的列
                        if (!columns[z].isHidden()) {
                            SecondStr += '<td style="font-size: medium"><b>' + columns[z].text + '</b></td>';
                            length++;
                        }
                    }
                    headerStr += '<td align="center" colspan="' + length + '" style="font-size: medium"><b>' + headerColumns[i].text + '</b></td>';
                } else {
                    if (isMoreHeader) {
                        headerStr += '<td style="font-size: medium" rowspan="2" align="center"><b>' + headerColumns[i].text + '</b></td>';
                    } else {
                        headerStr += '<td style="font-size: medium"><b>' + headerColumns[i].text + '</b></td>';
                    }
                }
            }
        }
        headerStr += '</tr>';
        if (SecondStr) {
            headerStr += SecondStr + '</tr>';
        }

        var ContentStr = '';
        store.each(function(record) {
            ContentStr += '<tr>';
            var value = '';
            for (var j in dataColumns) {
                if (!dataColumns[j].isHidden() && dataColumns[j].xtype != 'rownumberer' && (dataColumns[j].xtype != 'actioncolumn' || dataColumns[j].isDownload)) {
                    value = record.data[dataColumns[j].dataIndex];
                    if (dataColumns[j].exportType == 'date') {
                        value = Ext.util.Format.date(new Date(value*1000), 'Y-m-d');
                    }
                    ContentStr += '<td style="font-size: small">' + value + '</td>';
                }
            }
            ContentStr += '</tr>';
        });

        return headerStr + ContentStr;
    },

    excel_export: function(title) {
        var str = '<table border="1" cellpadding="1" cellspacing="1">';

        str += this.getContentStr(this);
        str += '</table>';

        title = title || this.title;
        //Ext.Msg.alert('test', str);
        Excel.export(str, title);
    }
});