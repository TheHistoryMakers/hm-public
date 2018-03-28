<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 1/5/18
 * Time: 11:20 AM
 */

namespace Drupal\thm_become_a_member\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\commerce_cart\CartSession;
use Drupal\commerce_product\Entity\Product;


class THMBecomeAMemberForm extends FormBase {

  /**
   * @var CartSession
   */
  protected $cartSession;

  public function getStore($storeId = 1) {
    return \Drupal::entityTypeManager()
      ->getStorage('commerce_store')
      ->load($storeId);
  }

  public function getProductVariation($productId) {
    $storage = \Drupal::entityTypeManager()
      ->getStorage('commerce_product');

    /** @var Product $product */
    $product = $storage->load($productId);

    return $product->getDefaultVariation();
  }

  public function makeCart() {

    $orderType    = 'default';
    $productId    = 2; // product ID.

    $entityMgr    = \Drupal::entityTypeManager();
    $cartMgr      = \Drupal::service('commerce_cart.cart_manager');
    $cartProvider = \Drupal::service('commerce_cart.cart_provider');

    $store = $this->getStore();
    $productVar = $this->getProductVariation($productId);

    $cart = $cartProvider->getCart($orderType, $store);

    if (!$cart) {
      $cart = $cartProvider->createCart($orderType, $store);
    }

    $orderItem = $entityMgr->getStorage('commerce_order_item')
      ->create([
        'type' => 'default',
        'purchased_entity' => (string) $productId,
        'quantity' => 1,
        'unit_price' => $productVar->getPrice()
      ]);

    $orderItem->save();
    $cartMgr->addOrderItem($cart, $orderItem);


    // need to redirect to /checkout/{cart_id}/login, but w/o a session context,
    // you can't directly jump into checkout flow
    return $cart;
  }

  public function prepOrder(array &$form, FormStateInterface $formState) {

    $cart        = $this->makeCart();
    $cartId      = $cart->id();
    $this->cartSession->addCartId($cartId);

    $formState->setRedirect('commerce_checkout.form', [
      'commerce_order' => $cartId, 'step' => null
    ]);
    return $form;
  }

  public function getFormId() {
    return 'create_thmda_order';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $this->cartSession = \Drupal::service('commerce_cart.cart_session');

    $form['membership_form'] = [
      '#type' => 'submit',
      '#value' => t('Buy')
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    return $this->prepOrder($form, $form_state);
  }

}