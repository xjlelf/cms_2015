<?php
/**
 * class StocksController
 *
 * created by jialiuxue
 * 2015-02-25
 */

class StocksController extends AppController {

    /** 引用模型 */
    public $uses = array('Stock', 'StockDetail', 'ProductStock');

    /**
     * 出入库单列表
     * @param array $application
     */
    public function lists($application = array()) {
        $application = array(
            'fields' => array(
                'Stock.id',
                'Stock.order_sn',
                'Stock.customer',
                'Stock.total_price',
                'Stock.stock_dt',
                'Customer.name'
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
        if (!empty($query['order_sn'])) {
            $conditions[] = array(
                'order_sn LIKE' => $this->Stock->selectLike($query['order_sn'])
            );
        }
        return $conditions;
    }

    /**
     * 保存方法
     */
    public function save() {
        $orderData = array();
        $orderData['order_sn'] = $this->data['order_sn'];
        $orderData['customer'] = $this->data['customer'];
        $orderData['stock_dt'] = $this->data['stock_dt'];
        $orderData['type'] = $this->data['type'];
        $detailData = $this->getDetailData($this->data);

        $this->Stock->begin();
        //第一步，计算虚拟库存
        $flag = $this->ProductStock->updateStock($detailData, $this->data['type']);
        if ($flag) {
            //第二步，保存明细
            foreach ($detailData as $v) {
                $this->StockDetail->create();
                if (!$this->StockDetail->save($v, array('atomic' => false))) {
                    $flag = false;
                    break;
                }
            }
            if ($flag) {
                //第三步，保存订单
                $orderData['total_price'] = 0;
                foreach ($detailData as $v) {
                    $orderData['total_price'] += $v['amt'];
                }
//                $orderData['total_price'] = array_sum(array_column($detailData, 'amt'));
                $flag = $this->Stock->save($orderData, array('atomic' => false));
            }
        }
        if ($flag) {
            $this->Stock->commit();
        } else {
            $this->Stock->rollback();
        }

        $this->result['success'] = $flag;
    }

    /**
     * 筛选明细数据
     * @param $data
     *
     * @return array
     */
    public function getDetailData($data) {
        $detailData = array();
        if (empty($data)) {
            return $detailData;
        }
        $oldDetailData = $this->ob2ar(json_decode($data['detail']));
        foreach ($oldDetailData as $k => $v) {
            if (!empty($v['product_id'])) {
                $detailData[$k]['order_sn'] = $data['order_sn'];
                $detailData[$k]['product_id'] = $v['product_id'];
                $detailData[$k]['price'] = $v['price'];
                $detailData[$k]['numbers'] = $v['numbers'];
                $detailData[$k]['amt'] = $v['amt'];
                $detailData[$k]['remark'] = $v['remark'];
            }
        }
        return $detailData;
    }

    /**
     * 对象转成数组
     * @param $obj
     *
     * @return array
     */
    public function ob2ar($obj) {
        if(is_object($obj)) {
            $obj = (array)$obj;
            $obj = $this->ob2ar($obj);
        } elseif(is_array($obj)) {
            foreach($obj as $key => $value) {
                $obj[$key] = $this->ob2ar($value);
            }
        }
        return $obj;
    }
}