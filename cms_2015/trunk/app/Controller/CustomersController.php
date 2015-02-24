<?php
/**
 * class CustomersController
 *
 * created by jialiuxue
 * 2015-02-24
 */

class CustomersController extends AppController {

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
        $application['conditions'] = $conditions;
        return $application;
    }
}