<?php

namespace Drupal\thm_commerce_shipment_weight\Controller;

use Drupal\commerce_order\Entity\Order;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;

/**
 * Class OrderStateChangerController.
 */
class OrderStateChangerController extends ControllerBase {

  /**
   * Change order state.
   *
   * @param $order_id
   * @param $order_state
   *
   * @return \Symfony\Component\HttpFoundation\RedirectResponse
   */
  public function change($order_id, $order_state) {
    /** @var Order $order */
    $order = Order::load($order_id);
    $current_state = $order->getState();
    $current_state->value = $order_state;
    $order->save();

    $destination = Url::fromUserInput(\Drupal::destination()->get());
    return $this->redirect($destination->getRouteName());
  }

}
