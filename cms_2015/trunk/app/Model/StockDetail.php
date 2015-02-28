<?php
/**
 * Created by PhpStorm.
 * User: MLS
 * Date: 15/2/15
 * Time: 下午6:41
 */

class StockDetail extends AppModel {

    /** 连表  */
    public $belongsTo = array (
        'Product' => array (
            'className' => 'Product',
            'foreignKey' => 'product_id'
        ),
        'Stock' => array (
            'className' => 'Stock',
            'conditions' => 'Stock.order_sn=StockDetail.order_sn',
            'foreignKey' => false
        )
    );
}