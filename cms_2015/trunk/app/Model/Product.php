<?php
/**
 * Created by PhpStorm.
 * User: MLS
 * Date: 15/2/15
 * Time: 下午6:41
 */

class Product extends AppModel {

    /**
     * 设置sku
     *
     * @return null|string
     */
    public function setSku() {
        $sku = null;
        if (!empty($this->data['Product'])) {
            if (!empty($this->data['Product']['color_code'])) {
                $sku = $this->data['Product']['color_code'];
            }
            $sku .= $this->data['Product']['cate_1'];
            if (!empty($this->data['Product']['cate_2'])) {
                $sku .= $this->data['Product']['cate_2'];
            }
            $this->data['Product']['sku_sn'] = $sku = $this->getSku($sku);
        }
        return $sku;
    }

    /**
     * 判断sku是否存在
     *
     * @param $sku
     *
     * @return bool
     */
    public function skuIsExists($sku) {
        $application = array(
            'conditions' => array(
                'sku_sn' => $sku
            )
        );
        $count = $this->find('count', $application);
        return $count > 0 ? true : false;
    }

    /**
     * 获取sku
     *
     * @param $sku
     * @param int $num
     *
     * @return string
     */
    public function getSku($sku, $num = 1) {
        $new_sku = $sku . $num;
        if ($this->skuIsExists($new_sku)) {
            $num++;
            $new_sku = $this->getSku($sku, $num);
        }
        return $new_sku;
    }
}