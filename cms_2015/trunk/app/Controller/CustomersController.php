<?php
/**
 * class CustomersController
 *
 * created by jialiuxue
 * 2015-02-24
 */

class CustomersController extends AppController {

    /**
     * 列表
     */
    public function lists($application = array()) {
        $application = array(
            'order' => 'created DESC'
        );
        parent::lists($application);
    }

    /**
     * 设置查询条件
     * @param $query
     */
    protected function _getConditions($query) {
        $conditions = array();
        if (!empty($query['name'])) {
            $conditions[] = array(
                'name LIKE' => $this->Customer->selectLike($query['name'])
            );
        }
        return $conditions;
    }
}