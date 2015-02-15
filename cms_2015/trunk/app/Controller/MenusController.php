<?php
/**
 * class MenusController
 *
 * created by jialiuxue
 * 2015-02-15
 */

class MenusController extends AppController {

    /**
     * 查询对应的url
     */
    public function getUrl() {
        $application = array(
            'fields' => 'url',
            'conditions' => array(
                'text' => $this->data['text']
            )
        );
        $data = $this->Menu->find('first', $application);
        $this->result['url'] = $data['Menu']['url'];
    }

    /**
     * 菜单节点数据获取
     */
    public function row() {
        $data = array();
        if (isset($this->request->query['node'])) {
            $application = array(
                'conditions' => array(
                    'pid' => $this->request->query['node']
                )
            );
            $data = $this->Menu->findAll($application);

            if (!empty($data)) {
                foreach ($data as $k => $v) {
                    if (!$this->Menu->hasChildren($v['id'])) {
                        $data[$k]['leaf'] = 1;
                    }
                }
            }
            //默认菜单
            if ($this->request->query['node'] == 0) {
                $data[] = array(
                    'id' => -1,
                    'text' => '系统管理'
                );
            }
            //默认子菜单
            if ($this->request->query['node'] == -1) {
                $data[] = array(
                    'id' => -2,
                    'text' => '菜单管理',
                    'url' => '/system/menu/lists',
                    'leaf' => 1
                );
            }
        }
        $this->result = $data;
    }
}