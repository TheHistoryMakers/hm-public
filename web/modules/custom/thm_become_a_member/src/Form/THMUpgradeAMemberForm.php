<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 3/1/18
 * Time: 10:28 AM
 */

namespace Drupal\thm_become_a_member\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

use Drupal\thm_direct_checkout\Helpers\CommerceCheckoutDirect;


class THMUpgradeAMemberForm extends FormBase {

  public function getFormId() {
    return 'upgrade_to_thmda';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['upgrade_form'] = [
      '#type' => 'submit',
      '#value' => t('Upgrade to DigitalMaker')
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $directCheckout = CommerceCheckoutDirect::create(
      \Drupal::getContainer(), 'default', 'default');
    return $directCheckout->prepOrder($form, $form_state);
  }

}