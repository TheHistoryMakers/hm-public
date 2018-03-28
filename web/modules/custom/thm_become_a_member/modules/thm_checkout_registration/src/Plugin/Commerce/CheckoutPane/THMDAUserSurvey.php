<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 2/8/18
 * Time: 10:17 AM
 */

namespace Drupal\thm_checkout_registration\Plugin\Commerce\CheckoutPane;

use Drupal\commerce_checkout\Plugin\Commerce\CheckoutPane\CheckoutPaneBase;
use Drupal\webform\WebformSubmissionForm;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Provides the user survey pane.
 *
 * @CommerceCheckoutPane(
 *   id = "user_survey",
 *   label = @Translation("User Profile"),
 *   default_step = "disabled",
 * )
 */
class THMDAUserSurvey extends CheckoutPaneBase {
  /**
   * {@inheritdoc}
   */
  public function buildPaneForm(array $pane_form, FormStateInterface $form_state, array &$complete_form) {
    $pane_form['user_survey_webform'] = [
      '#type' => 'webform',
      '#webform' => 'user_profile'
    ];

    $pane_form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Next'),
      '#op' => 'continue'
    ];

    $pane_form['cancel'] = [
      '#type' => 'link',
      '#title' => $this->t('go back'),
      '#url' => Url::fromUri('internal:/checkout/' . $this->order->id() . '/membership_options'),
      '#op' => 'cancel'
    ];

    return $pane_form;
  }

  public function bundleUserInput(array $formValues): array {
    return array_reduce(array_keys($formValues), function($prev, $curr) use ($formValues) {
      $dataValues = [
        'gender', 'age', 'education', 'occupation', 'ethnicity', 'purpose',
        'referred', 'social_media_usage', 'hm_familiarity', 'income'
      ];

      if (in_array($curr, $dataValues)) $prev['data'][$curr] = $formValues[$curr];
      else $prev[$curr] = $formValues[$curr];

      return $prev;
    }, [ 'webform_id' => 'user_profile', 'data' => [] ]);
  }

  public function submitPaneForm(array &$pane_form, FormStateInterface $form_state, array &$complete_form) {
    $triggeringElement = $form_state->getTriggeringElement();
    $formValues        = $form_state->getUserInput();

    switch ($triggeringElement['#op']) {
      case 'continue':
        $webformValues = $this->bundleUserInput($formValues);
        WebformSubmissionForm::submitValues($webformValues);
    }
  }
}