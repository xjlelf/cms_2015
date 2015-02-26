<?php
/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

App::uses('Controller', 'Controller');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller {

    /** 引用组件 */
    public $components = array('Session', 'Auth', 'Paginator');

    /** 默认标题 */
    public $title = 'CMS管理系统';

    /** 默认布局 */
    public $layout = 'ajax';

    /** 默认结果 */
    public $result = array();

    /** 默认模型 */
    public $model_name = null;

    /**
     * 控制器执行前执行
     */
    public function beforeFilter() {
        if (empty($this->model_name)) {
            $this->model_name = $model_name = $this->modelClass;
        }
        $this->model = $this->$model_name;
        // 验证管理员的登录情况
        $this->__authAdmin();
        if ($this->Auth->user()) {
            $this->set('admin', $this->Auth->user());
        }
    }

    /**
     * 控制器结束后执行
     * */
    public function beforeRender() {
        $this->set('title', $this->title);
        $this->set('data', $this->result);
        if ($this->layout === 'ajax') {
            $this->view = '/ajax';
        }
    }

    /**
     * 验证管理员登录情况
     * */
    private function __authAdmin() {
        // 是否有Auth组件
        if (!isset($this->Auth)) { return false; }
        // 允许不登录的action
        if(!empty($this->authallow)){
            $this->Auth->allow($this->authallow);
        }
        // 设置session名称
        AuthComponent::$sessionKey = 'Auth.Manager';
        // 设置管理员表的信息
        $this->Auth->authenticate = array('Form' => array(
            'fields' => array(
                'username' => 'login',
                'password' => 'pwd'
            ),
            'userModel' => 'Manager'
        ));
        // 设置登录方法
        $this->Auth->loginAction = array('controller' => 'Welcome', 'action' => 'login');
        // 取消登录成功之后自动跳转
        $this->Auth->autoRedirect  = false;
        $this->Auth->logoutRedirect= array('controller' => 'Welcome', 'action' => 'login');
    }

    /**
     * 公用列表方法
     */
    public function lists($application = array()) {
        $application['conditions'] = $this->_getConditions($this->request->query);
        if ($this->_setPage($application)) {
            $this->result = $this->_forPaginate($application);
        } else {
            $this->result = $this->model->findAll($application);
        }
    }

    /**
     * 公用保存方法
     */
    public function save() {
        $this->model->set($this->data);
        $update_flag = $this->model->save();
        $this->result['success'] = $update_flag;
    }

    /**
     * 公用删除方法
     */
    public function delete($id) {
        $delete_flag = false;
        if (!empty($id)) {
            $delete_flag = $this->model->delete($id);
        }
        $this->result['success'] = $delete_flag;
    }

    /**
     * 设置查询条件
     * @param $query
     */
    protected  function _getConditions($query) {}

    /**
     * 设置分页
     * @param $application
     *
     * @return bool
     */
    protected function _setPage(& $application) {
        if (!empty($this->request->query['limit'])) {
            $application['limit'] = $this->request->query['limit'];
        }
        if (!empty($this->request->query['page'])) {
            $this->request->params['named']['page'] = $this->request->query['page'];
            return true;
        }
        return false;
    }

    /**
     * 读取分页数据
     *
     * @param $options
     * @param array $conditions
     * @param string $model
     * @return array
     */
    protected function _forPaginate($options, $conditions = array(), $model = null) {
        if (empty($model)) {
            $model = $this->model;
        }
        $this->Paginator->settings = $options;
        $data = $this->Paginator->paginate($model, $conditions);
        $result = array();
        foreach ($data as $key => $val) {
            $result['data'][$key] = array();
            foreach ($val as $k => $v) {
                $result['data'][$key] = array_merge($result['data'][$key], $v);
            }
        }
        if (isset($this->request['paging'][$this->model_name]['count'])) {
            $result['total'] = $this->request['paging'][$this->model_name]['count'];
        }
        return $result;
    }
}
