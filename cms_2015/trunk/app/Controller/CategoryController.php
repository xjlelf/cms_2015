<?php
/**
 * class CategoryController
 *
 * created by jialiuxue
 * 2015-02-15
 */

class CategoryController extends AppController {

    /** 引用的model */
    public $uses = 'Category';

    /**
     * 列表
     */
    public function lists() {
        if (isset($this->request->query['type'])) {
            $application = array(
                'fields' => array(
                    'code',
                    'category_name'
                ),
                'conditions' => array(
                    'type' => $this->request->query['type']
                )
            );
            $this->result = $this->model->findAll($application);
        } else {
            parent::lists();
        }
    }
}