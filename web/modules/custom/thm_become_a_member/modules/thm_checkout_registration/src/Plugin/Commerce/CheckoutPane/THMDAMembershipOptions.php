<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 1/12/18
 * Time: 2:57 PM
 */

namespace Drupal\thm_checkout_registration\Plugin\Commerce\CheckoutPane;

use Drupal\commerce_checkout\Plugin\Commerce\CheckoutPane\CheckoutPaneBase;
use Drupal\Core\Form\FormStateInterface;

use Drupal\Core\Url;
use Drupal\thm_checkout_registration\Helpers\THMDACommerceHelpers;

/**
 * Provides the completion message pane.
 *
 * @CommerceCheckoutPane(
 *   id = "thmda_membership_opts",
 *   label = @Translation("THM Digital Access - Subscription Options"),
 *   default_step = "disabled",
 * )
 */
class THMDAMembershipOptions extends CheckoutPaneBase {

  protected function addToOrder($variationId) {
    $productVar = THMDACommerceHelpers::getProductVariation($variationId);

    $orderItem = $this->entityTypeManager
      ->getStorage('commerce_order_item')
      ->create([
        'type' => 'default',
        'purchased_entity' => (string) $variationId,
        'quantity' => 1,
        'unit_price' => $productVar->getPrice()
      ]);

    $orderItem->save();
    $this->order->addItem($orderItem);
  }

  public function getBaseId() {
    return 'thmda_membership_opts';
  }

  /**
   * {@inheritdoc}
   */
  public function buildPaneForm(array $pane_form, FormStateInterface $form_state, array &$complete_form) {

    $pane_form['subscription_opts'] = [
      '#type' => 'radios',
      '#title' => $this->t('Choose one'),
      '#default_value' => 1,
      '#required' => true,
      '#options' => [
        1 => $this->t('$30/One month membership'),
        3 => $this->t('$300/One year membership')
      ]
    ];

    $pane_form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Next'),
      '#op' => 'continue'
    ];

    $pane_form['cancel'] = [
      '#type' => 'link',
      '#title' => $this->t('Cancel'),
      '#url' => Url::fromUri('internal:/become-a-member'),
      '#op' => 'cancel'
    ];

    return $pane_form;
  }

  public function submitPaneForm(array &$pane_form, FormStateInterface $form_state, array &$complete_form) {
    $triggeringElement = $form_state->getTriggeringElement();
    $formValues        = $form_state->getValues()[$this->getBaseId()];

    switch ($triggeringElement['#op']) {
      case 'continue':
        $this->addToOrder($formValues['subscription_opts']);

        return $form_state->setRedirect('commerce_checkout.form', [
          'commerce_order' => $this->order->id(),
          'step' => $this->checkoutFlow->getNextStepId($this->getStepId()),
        ]);
    }
  }
}