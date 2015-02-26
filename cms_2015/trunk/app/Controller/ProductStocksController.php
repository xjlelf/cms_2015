<?php
/**
 * class ProductStocksController
 *
 * created by jialiuxue
 * 2015-02-26
 */

class ProductStocksController extends AppController {

    /**
     * 出入库单列表
     * @param array $application
     */
    public function lists($application = array()) {
        $application = array(
            'fields' => array(
                'ProductStock.id',
                'ProductStock.product_id',
                'ProductStock.qty',
                'ProductStock.real_qty',
                'Product.sku_sn',
                'Product.goods_name',
                'Product.stand'
            )
        );
        parent::lists($application);
    }

    /**
     * 设置查询条件
     * @param $query
     */
    protected function _getConditions($query) {
        $conditions = array();
        if (!empty($query['sku_sn'])) {
            $conditions[] = array(
                'Product.sku_sn LIKE' => $this->ProductStock->selectLike($query['sku_sn'])
            );
        }
        return $conditions;
    }
}