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

use Drupal\thm_direct_checkout\Helpers\CommerceCheckoutDirect;


class THMBecomeAMemberForm extends FormBase {

  public function getFormId() {
    return 'create_thmda_order';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['membership_form'] = [
      '#type' => 'submit',
      '#value' => t('Buy')
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $directCheckout = CommerceCheckoutDirect::create(
      \Drupal::getContainer(), 'default', 'default');
    return $directCheckout->prepOrder($form, $form_state);
  }

}