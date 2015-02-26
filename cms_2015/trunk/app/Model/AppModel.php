<?php
/**
 * Application model for CakePHP.
 *
 * This file is application-wide model file. You can put all
 * application-wide model-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Model
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

App::uses('Model', 'Model');

/**
 * Application model for Cake.
 *
 * Add your application-wide methods in the class below, your models
 * will inherit them.
 *
 * @package       app.Model
 */
class AppModel extends Model {

    /**
     * 查询多个数据
     * @param array $applications
     *
     * @return array
     */
    public function findAll($applications = array()) {
        $data = $this->find('all', $applications);
        $result = array();
        foreach ($data as $key => $val) {
            $result['data'][$key] = array();
            foreach ($val as $k => $v) {
                $result['data'][$key] = array_merge($result['data'][$key], $v);
            }
        }
        return $result;
    }

    /**
     * 模糊查询设置
     *
     * @param $value
     * @param bool $left
     * @param bool $right
     * @return string
     */
    public function selectLike($value, $left = true, $right = true) {
        if ($left) {
            $value = '%' . $value;
        }
        if ($right) {
            $value = $value . '%';
        }
        return $value;
    }
}
