<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 1/15/18
 * Time: 11:26 AM
 */

namespace Drupal\thm_checkout_registration\Helpers;


class THMDACommerceHelpers {
  public static function getProductVariation($variation) {
    return \Drupal::entityTypeManager()
      ->getStorage('commerce_product_variation')
      ->load($variation);
  }
}