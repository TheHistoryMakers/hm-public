<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 3/1/18
 * Time: 11:05 AM
 */

namespace Drupal\thm_donation_flow\Form;


use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

use Drupal\thm_direct_checkout\Helpers\CommerceCheckoutDirect;


class THMDonationForm extends FormBase {

  public function getFormId() {
    return 'make_a_donation';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['donation_form'] = [
      '#type' => 'submit',
      '#value' => t('Donate Now')
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $directCheckout = CommerceCheckoutDirect::create(
      \Drupal::getContainer(), 'donation', 'default');
    return $directCheckout->prepOrder($form, $form_state);
  }

}