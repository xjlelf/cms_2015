<?php
/**
 * Created by PhpStorm.
 * User: MLS
 * Date: 15/2/15
 * Time: 下午6:41
 */

class ProductStock extends AppModel {

    /** 连表  */
    public $belongsTo = array (
        'Product' => array (
            'className' => 'Product',
            'foreignKey' => 'product_id'
        )
    );

    /**
     * 更新库存
     *
     * @param $data
     * @param $type
     * @param int $revert
     *
     * @return bool
     * @throws Exception
     */
    public function updateStock($data, $type, $revert = 1) {
        $update_flag = true;
        if (empty($data)) {
            return false;
        }
        foreach ($data as $v) {
            $saveData = $this->setStock($v, $type, $revert);
            $this->create();
            if (!$this->save($saveData, array('atomic' => false))) {
                $update_flag = false;
                break;
            }
        }
        return $update_flag;
    }

    /**
     * 计算库存
     *
     * @param $row
     * @param $type
     * @param int $revert
     *
     * @return array
     */
    public function setStock($row, $type, $revert = 1) {
        $application = array(
            'fields' => array(
                'id',
                'qty'
            ),
            'conditions' => array(
                'product_id' => $row['product_id']
            )
        );
        $data = $this->find('first', $application);
        if (empty($data)) {
            if ($type == 1) {
                $qty = $row['numbers'];
            } else {
                $qty = $row['numbers'] * -1;
            }
            $saveData = array(
                'product_id' => $row['product_id'],
                'qty' => $qty
            );
        } else {
            if ($type == 1) {
                if ($revert == 1) {
                    $qty = $data[$this->name]['qty'] + $row['numbers'];
                } else {
                    $qty = $data[$this->name]['qty'] - $row['numbers'];
                }
            } else {
                if ($revert == 1) {
                    $qty = $data[$this->name]['qty'] - $row['numbers'];
                } else {
                    $qty = $data[$this->name]['qty'] + $row['numbers'];
                }
            }
            $saveData = array(
                'id' => $data[$this->name]['id'],
                'qty' => $qty
            );
        }
        return $saveData;
    }
}