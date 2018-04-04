<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 3/26/18
 * Time: 12:45 PM
 */

namespace Drupal\thm_jwt\Controller;


class THMJWTUnauthorized {

  public function content() {
    return [
      '#theme' => 'thm_jwt'
    ];
  }
}