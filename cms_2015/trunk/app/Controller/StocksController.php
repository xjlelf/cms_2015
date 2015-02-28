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
                'Stock.type',
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

        $flag = true;
        //更新订单
        if (!empty($this->data['id'])) {
            $orderData['id'] = $this->data['id'];
            $flag = $this->revertOrderDetails($this->data['id'], $this->data['type']);
        }
        if ($flag) {
            //第一步，计算虚拟库存
            $flag = $this->ProductStock->updateStock($detailData, $this->data['type']);
        }
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
        $oldDetailData = ob2ar(json_decode($data['detail']));
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
     * 订单删除
     *
     * @param $id
     */
    public function delete($id) {
        $delete_flag = false;
        if (!empty($id)) {
            $this->Stock->begin();

            $application = array(
                'fields' => array(
                    'Stock.type'
                ),
                'conditions' => array(
                    'Stock.id' => $id
                )
            );
            $orderType = $this->Stock->find('first', $application);
            $type = $orderType['Stock']['type'];
            $delete_flag = $this->revertOrderDetails($id, $type);
            if ($delete_flag) {
                $delete_flag = $this->Stock->delete($id);
            }
            if ($delete_flag) {
                $this->Stock->commit();
            } else {
                $this->Stock->rollback();
            }
        }
        $this->result['success'] = $delete_flag;
    }

    /**
     * 还原订单明细和库存
     *
     * @param $order_id
     * @param $type
     *
     * @return mixed
     */
    private function revertOrderDetails($order_id, $type) {
        $application = array(
            'fields' => array(
                'StockDetail.product_id',
                'StockDetail.numbers'
            ),
            'conditions' => array(
                'Stock.id' => $order_id
            )
        );
        $oldDetailData = $this->StockDetail->findAll($application);
        //还原库存
        $flag = $this->ProductStock->updateStock($oldDetailData['data'], $type, -1);
        //删除原明细
        if ($flag) {
            $flag = $this->StockDetail->deleteAll(array('Stock.id' => $order_id));
        }
        return $flag;
    }

    /**
     * 订单明细列表
     *
     * @param $order_sn
     */
    public function detail_lists() {
        $order_sn = $this->request->query('order_sn');
        if (empty($order_sn)) {
            $this->result['data'] = array();
        }
        $application = array(
            'fields' => array(
                'StockDetail.product_id',
                'StockDetail.price',
                'StockDetail.numbers',
                'StockDetail.amt',
                'StockDetail.remark',
                'Product.sku_sn',
                'Product.goods_name'
            ),
            'conditions' => array(
                'StockDetail.order_sn' => $order_sn
            )
        );
        $this->result = $this->StockDetail->findAll($application);
    }
}