<?php
/**
 * 全局函数
 *
 * Created by PhpStorm.
 * User: MLS
 * Date: 15/2/27
 * Time: 下午3:30
 */
if (!function_exists('ob2ar')) {

    /**
     * 对象转成数组
     * @param $obj
     *
     * @return array
     */
    function ob2ar($obj) {
        if(is_object($obj)) {
            $obj = (array)$obj;
            $obj = ob2ar($obj);
        } elseif(is_array($obj)) {
            foreach($obj as $key => $value) {
                $obj[$key] = ob2ar($value);
            }
        }
        return $obj;
    }

}