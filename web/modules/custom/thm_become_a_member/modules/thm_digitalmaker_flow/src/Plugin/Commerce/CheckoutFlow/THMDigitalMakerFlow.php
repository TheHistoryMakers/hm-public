<?php

namespace Drupal\thm_digitalmaker_flow\Plugin\Commerce\CheckoutFlow;

use Drupal\commerce_checkout\Plugin\Commerce\CheckoutFlow\CheckoutFlowWithPanesBase;


/**
 * @CommerceCheckoutFlow(
 *  id = "thm_digitalmaker_checkout_flow",
 *  label = @Translation("DigitalMaker Checkout Flow"),
 * )
 */
class THMDigitalMakerFlow extends CheckoutFlowWithPanesBase {

  /**
  * {@inheritdoc}
  */
  public function getSteps() {
    return [
      'membership_options' => [
        'label' => $this->t('Membership Options'),
        'previous_label' => $this->t('Go Back')
      ],
      'registration_info' => [
        'label' => $this->t('Registration Information'),
        'previous_label' => $this->t('Go Back')
      ],
      'user_profile' => [
        'label' => $this->t('User Profile'),
        'previous_label' => $this->t('Go Back')
      ],
      'payment_method' => [
        'label' => $this->t('Payment Method'),
        'previous_label' => $this->t('Go Back')
      ]
    ] + parent::getSteps();
  }
}
