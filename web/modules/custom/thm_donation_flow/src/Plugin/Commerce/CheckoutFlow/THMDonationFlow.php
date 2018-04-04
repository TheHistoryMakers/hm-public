<?php

namespace Drupal\thm_donation_flow\Plugin\Commerce\CheckoutFlow;

use Drupal\commerce_checkout\Plugin\Commerce\CheckoutFlow\CheckoutFlowWithPanesBase;


/**
 * @CommerceCheckoutFlow(
 *  id = "thm_donation_checkout_flow",
 *  label = @Translation("Donation Checkout Flow"),
 * )
 */
class THMDonationFlow extends CheckoutFlowWithPanesBase {

  /**
   * {@inheritdoc}
   */
  public function getSteps() {
    return [
        'login' => [
          'label' => $this->t('Login')
        ],
        'donation_options' => [
          'label' => $this->t('Pick A Donation')
        ],
        'payment_method' => [
          'label' => $this->t('Payment Method'),
          'previous_label' => $this->t('Go Back')
        ]
      ] + parent::getSteps();
  }
}
