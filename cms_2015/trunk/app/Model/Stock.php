<?php
/**
 * Created by PhpStorm.
 * User: MLS
 * Date: 15/2/15
 * Time: 下午6:41
 */

class Stock extends AppModel {

    /** 连表  */
    public $belongsTo = array (
        'Customer' => array (
            'className' => 'Customer',
            'foreignKey' => 'customer'
        )
    );

    /** 连表  */
    public $hasOne = array (
        'StockDetail' => array (
            'className' => 'StockDetail',
            'conditions' => 'Stock.order_sn=StockDetail.order_sn',
            'foreignKey' => false
        )
    );
}