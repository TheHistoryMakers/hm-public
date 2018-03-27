<?php

namespace Drupal\thm_become_a_member\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class THMBecomeAMemberController.
 */
class THMBecomeAMemberController extends ControllerBase {

  public function content() {

    $formNamespace = '\Drupal\thm_become_a_member\Form';

    $basicSignUp      = $formNamespace . '\THMRegister';
    $corporateSignUp  = $formNamespace . '\THMCorporateSignup';
    $accessTheArchive = $formNamespace . '\THMBecomeAMemberForm';

    return [
      '#theme' => 'thm_become_a_member',
      '#payment_form' => $this->formBuilder()->getForm($accessTheArchive),
      '#signup_form' => $this->formBuilder()->getForm($basicSignUp),
      '#industry_form' => $this->formBuilder()->getForm($corporateSignUp)
    ];
  }
}
