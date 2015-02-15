<?php
/**
 * class ManagersController
 *
 * created by jialiuxue
 * 2015-02-15
 */

class ManagersController extends AppController {

    /** 允许未登录的方法 */
    public $authallow = array(
        'login'
    );

    /**
     * 管理员登录
     * */
    public function login() {
        // 如果已登录直接跳转
        if ($this->Auth->user()) {
            $this->redirect(array(
                'controller' => 'Welcome',
                'action' => 'index'
            ));
        }
        //判断是否是表单提交和表单是否有数据
        if ($this->request->is('post') && !empty($this->request->data)) {
            if ($this->Auth->login()) {
                $this->redirect(array(
                    'controller' => 'Welcome',
                    'action' => 'index'
                ));
            } else {
                $this->set('errorMessage', '密码错误或者用户名不存在');
                $this->render('/Welcome/login');
            }
        }
    }

    /**
     * 管理员退出登录
     * */
    public function logout() {
        $this->redirect($this->Auth->logout());
    }
}