<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 1/12/18
 * Time: 3:30 PM
 */

namespace Drupal\thm_become_a_member\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Url;
use Drupal\Core\Form\FormStateInterface;

class THMRegister extends FormBase {

  public function getFormId() {
    return 'signup_basicmaker';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['signup_form'] = [
      '#type' => 'submit',
      '#value' => t('Sign Up')
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $form_state->setRedirectUrl(Url::fromUri('internal:/become-a-member/basic'));
  }

}