<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 2/28/18
 * Time: 4:40 PM
 */

namespace Drupal\thm_direct_checkout\Helpers;

use Drupal\Core\Form\FormStateInterface;
use Drupal\commerce_product\Entity\Product;
use Drupal\commerce_cart\CartSession;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\core\Entity\EntityTypeManager;

class CommerceCheckoutDirect {

  /**
   * @var EntityTypeManager
   */
  protected $entityTypeMgr;

  /**
   * @var CartSession
   */
  protected $cartSession;

  /**
   * @var string
   */
  protected $orderItemType;

  /**
   * @var string
   */
  protected $orderType;

  /**
   * CommerceCheckoutDirect constructor.
   *
   * @param $entityTypeMgr EntityTypeManager
   * @param $cartSession CartSession
   * @param $orderItemType string
   * @param $orderType string
   */
  public function __construct($orderType, $orderItemType, $entityTypeMgr, $cartSession) {
    $this->entityTypeMgr = $entityTypeMgr;
    $this->cartSession   = $cartSession;
    $this->orderType     = $orderType;
    $this->orderItemType = $orderItemType;
  }

  /**
   * Static constructor invocation.
   *
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   * @param $orderType string
   * @param $orderItemType string
   *
   * @return static
   */
  public static function create(ContainerInterface $container, $orderType, $orderItemType) {
    return new static(
      $orderType,
      $orderItemType,
      $container->get('entity_type.manager'),
      $container->get('commerce_cart.cart_session')
    );
  }

  /**
   * Convenience method for retrieving the store object.
   *
   * @param int $storeId
   *
   * @return \Drupal\Core\Entity\EntityInterface|null
   */
  public function getStore($storeId = 1) {
    return $this->entityTypeMgr->getStorage('commerce_store')->load($storeId);
  }

  /**
   * Convenience method for retrieving a product variation.
   *
   * @param $productId
   *
   * @return \Drupal\commerce_product\Entity\ProductVariationInterface|\Drupal\Core\Entity\ContentEntityInterface|null
   */
  public function getProductVariation($productId) {
    $storage = $this->entityTypeMgr->getStorage('commerce_product');

    /** @var Product $product */
    $product = $storage->load($productId);

    return $product->getDefaultVariation();
  }

  /**
   * Creates a cart and adds a placeholder item.
   *
   * @return \Drupal\commerce_order\Entity\OrderInterface
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function makeCart() {
    // TODO: Eliminate the hard-codedness below.
    $productId    = 2; // product ID.

    $cartMgr      = \Drupal::service('commerce_cart.cart_manager');
    $cartProvider = \Drupal::service('commerce_cart.cart_provider');

    $store = $this->getStore();
    $productVar = $this->getProductVariation($productId);

    $cart = $cartProvider->getCart($this->orderType, $store);

    if (!$cart) {
      $cart = $cartProvider->createCart($this->orderType, $store);
    }

    $orderItem = $this->entityTypeMgr->getStorage('commerce_order_item')
      ->create([
        'type' => $this->orderItemType,
        'purchased_entity' => (string) $productId,
        'quantity' => 1,
        'unit_price' => $productVar->getPrice()
      ]);

    $orderItem->save();
    $cartMgr->addOrderItem($cart, $orderItem);

    return $cart;
  }

  /**
   * Prepares an order, creates a cart and redirects user to the checkout flow
   * for the order type and order item type provided when this class was
   * instantiated.
   *
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $formState
   *
   * @return array
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function prepOrder(array &$form, FormStateInterface $formState) {

    $cart        = $this->makeCart();
    $cartId      = $cart->id();
    $this->cartSession->addCartId($cartId);

    $formState->setRedirect('commerce_checkout.form', [
      'commerce_order' => $cartId, 'step' => null
    ]);
    return $form;
  }
}