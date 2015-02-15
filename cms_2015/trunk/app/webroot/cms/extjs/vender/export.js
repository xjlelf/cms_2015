/**
 * js导出excel类
 */


var Excel = (function() {

    function base64(string) {
        return window.btoa(unescape(encodeURIComponent(string)));
    }

    //获取下载字符串
    function getstring(string) {
        return '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body>' + string + '</body></html>';

    }

    return {
        //下载
        export: function(string, filename) {
            var template = getstring(string);
            var filename = filename || 'excelexport';
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.hreflang = 'zh';
            a.charset = 'utf8';
            a.type= "application/vnd.ms-excel";
            a.href = 'data:application/vnd.ms-excel;base64,' + base64(template);
            a.target = '_blank';
            a.download = filename + '.xls';
            a.click();
        }
    }
})();