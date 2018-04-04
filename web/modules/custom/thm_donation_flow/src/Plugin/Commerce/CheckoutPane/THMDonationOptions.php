<?php

namespace Drupal\thm_donation_flow\Plugin\Commerce\CheckoutPane;

use Drupal\commerce_checkout\Plugin\Commerce\CheckoutPane\CheckoutPaneBase;
use Drupal\commerce_product\Entity\Product;
use Drupal\commerce_product\Entity\ProductVariation;
use Drupal\Core\Form\FormStateInterface;
use Drupal\commerce_order\Entity\OrderItemInterface;
use Drupal\thm_checkout_registration\Helpers\THMDACommerceHelpers;

/**
 * Provides the completion message pane.
 *
 * @CommerceCheckoutPane(
 *   id = "thm_donation_opts",
 *   label = @Translation("THM Donations - Options"),
 *   default_step = "disabled",
 * )
 */
class THMDonationOptions extends CheckoutPaneBase {

  protected function addToOrder($variationId) {
    $productVar = THMDACommerceHelpers::getProductVariation($variationId);

    /** @var OrderItemInterface $orderItem */
    $orderItem = $this->entityTypeManager
      ->getStorage('commerce_order_item')
      ->create([
        'type' => 'default',
        'purchased_entity' => (string) $variationId,
        'quantity' => 1,
        'unit_price' => $productVar->getPrice(),
      ]);

    $orderItem->save();
    $this->order->addItem($orderItem);
  }

  public function getDonationData() {
    $product = 'commerce_product';
    $results = \Drupal::entityQuery($product)
                ->condition('title', 'Donation')
                ->execute();

    if (count($results)) {
      /** @var Product $donation */
      $donation = $this->entityTypeManager->getStorage($product)->load(key($results));
      $output   = [];

      /** @var ProductVariation $option */
      foreach ($donation->getVariations() as $option) {
        $output[$option->id()] = $option->getTitle();
      }

      return $output;
    }
  }

  public function getBaseId() {
    return 'thm_donation_opts';
  }

  /**
   * {@inheritdoc}
   */
  public function buildPaneForm(array $pane_form, FormStateInterface $form_state, array &$complete_form) {

    $pane_form['donation_opts'] = [
      '#type' => 'radios',
      '#title' => $this->t('Choose one'),
      '#default_value' => 1,
      '#required' => true,
      '#options' => $this->getDonationData(),
    ];

    $pane_form['donor_email'] = [
      '#type' => 'email',
      '#title' => $this->t('Email Address'),
      '#required' => true
    ];

    $pane_form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Next'),
      '#op' => 'continue',
    ];

    return $pane_form;
  }

  public function submitPaneForm(array &$pane_form, FormStateInterface $form_state, array &$complete_form) {
    $triggeringElement = $form_state->getTriggeringElement();
    $formValues        = $form_state->getValues()[$this->getBaseId()];

    switch ($triggeringElement['#op']) {
      case 'continue':
        $this->addToOrder($formValues['donation_opts']);

        $this->order->setEmail($formValues['donor_email']);

        return $form_state->setRedirect('commerce_checkout.form', [
          'commerce_order' => $this->order->id(),
          'step' => $this->checkoutFlow->getNextStepId($this->getStepId()),
        ]);
    }
  }
}
