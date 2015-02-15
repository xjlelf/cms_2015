<?php
/**
 * class MenusController
 *
 * created by jialiuxue
 * 2015-02-15
 */

class MenusController extends AppController {

    /**
     * 查询对应的url
     */
    public function getUrl() {
        $application = array(
            'fields' => 'url',
            'conditions' => array(
                'text' => $this->data['text']
            )
        );
        $data = $this->Menu->find('first', $application);
        $this->result['url'] = $data['Menu']['url'];
    }
}