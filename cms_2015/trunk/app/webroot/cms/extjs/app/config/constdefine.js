/**
 * 项目常量定义文件
 */
Ext.define('/cms.extjs.app.config.constdefine', {

    /* 小图标路劲 */
    COMMON_ICONS_PATH: '/cms/extjs/lib/resources/icons/',

    /* 标题 */
    TITLE: {
        // 项目标题
        PROJECT: '欢迎进入WMS管理系统'
    },

    //获取日期
    GET_DATE: function(type) {
        if (!type) {
            type = 'today';
        }
        var date = new Date();
        var time = this.GET_TIME(type, date);
        date.setTime(time);
        return Ext.Date.format(date, 'Y-m-d');
    },

    //获取时间戳
    GET_TIME: function(type, date) {
        var time = date.getTime();
        switch (type) {
            case 'yesterday': return time - 86400*1000;
            case 'lastmonth': return time - 86400*Ext.Date.getDaysInMonth(date)*1000;
            default : return time;
        }
    },

    TEST_OBJECT: function(obj) {
        var str = '';
        for (var a in obj) {
            str += a + "\r\n";
        }
        alert(str);
    }
});