<?php
/**
 * Created by PhpStorm.
 * User: MLS
 * Date: 15/2/15
 * Time: 下午6:41
 */

class Menu extends AppModel {

    /**
     * 判断是否有子菜单
     *
     * @param $id
     *
     * @return bool
     */
    public function hasChildren($id) {
        $application = array(
            'conditions' => array(
                'pid' => $id
            )
        );
        $count = $this->find('count', $application);
        return $count > 0 ? true : false;
    }
}