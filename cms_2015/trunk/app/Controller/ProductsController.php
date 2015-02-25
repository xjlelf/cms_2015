<?php
/**
 * class ProductsController
 *
 * created by jialiuxue
 * 2015-02-15
 */

class ProductsController extends AppController {

    /**
     * 产品保存
     */
    public function save() {
        $this->Product->set($this->data);
        $sku_sn = $this->Product->setSku();
        parent::save();
    }

    /**
     * 设置查询条件
     * @param $query
     */
    protected function _getConditions($query) {
        $conditions = array();
        if (!empty($query['sku_sn'])) {
            $conditions[] = array(
                'sku_sn LIKE' => $this->Product->selectLike($query['sku_sn'])
            );
        }
        if (!empty($query['query'])) {
            $conditions[] = array(
                'sku_sn LIKE' => $this->Product->selectLike($query['query'])
            );
        }
        if (!empty($query['cate_1'])) {
            $conditions[] = array(
                'cate_1' => $query['cate_1']
            );
        }
        if (!empty($query['cate_2'])) {
            $conditions[] = array(
                'cate_2' => $query['cate_2']
            );
        }
        $application['conditions'] = $conditions;
        return $application;
    }
}