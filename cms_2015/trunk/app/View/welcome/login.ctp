<!DOCTYPE html>
<html lang="en" class="no-js">

<head>

    <meta charset="utf-8">
    <title><?php echo $title;?> | 登录页面</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- CSS -->
    <link rel="stylesheet" href="/cms/login/css/reset.css">
    <link rel="stylesheet" href="/cms/login/css/supersized.css">
    <link rel="stylesheet" href="/cms/login/css/style.css">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

</head>

<body>

<div class="page-container">
    <h1>WMS系统登录</h1>
    <?php echo $this->form->create('Manager', array(
        'url' => array(
            'controller' => 'Managers',
            'action' => 'login'
        )
    ));?>
    <?php echo $this->form->input('login', array(
        'class' => 'username',
        'label' => false,
        'div' => false,
        'placeholder' => '用户名'
    ));?>
    <?php echo $this->form->input('pwd', array(
        'type' => 'password',
        'label' => false,
        'div' => false,
        'placeholder' => '密码',
        'value' => ''
    ));?>
    <div><span><?php echo @$errorMessage;?></span></div>
    <button type="submit">登录</button>
    <?php echo $this->form->end();?>
</div>

<!-- Javascript -->
<script src="/cms/login/js/jquery-1.8.2.min.js"></script>
<script src="/cms/login/js/supersized.3.2.7.min.js"></script>
<script src="/cms/login/js/supersized-init.js"></script>
<script src="/cms/login/js/scripts.js"></script>

</body>

</html>