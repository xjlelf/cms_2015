<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <?php $user_name = $admin['login'];?>
    <link rel="stylesheet" type="text/css" href="/cms/extjs/lib/resources/css/ext-all.css">
    <script type="text/javascript">
        var LOGIN_USER = '<?php echo $user_name;?>';
    </script>
    <script type="text/javascript" src="/cms/extjs/vender/export.js"></script>
    <script type="text/javascript" src="/cms/extjs/lib/ext-all.js"></script>
    <script type="text/javascript" src="/cms/extjs/lib/locale/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="/cms/extjs/app.js"></script>
    <title><?php echo $title;?></title>
    <style type="text/css">
        /*grid表头标题超过长度自动换行*/
        .x-column-header-text{
            background-repeat: no-repeat;
            display: inline-block;
            white-space: normal;
        }
        .x-column-header-inner{
            text-align: center !important;
        }
        .x-grid-cell-inner {
            /*内容长的时候换行*/
            white-space: normal !important;
            word-wrap: break-word;
        }
        .x-grid-cell{
            vertical-align: middle !important;
        }
    </style>
</head>

<body>

</body>
</html>
