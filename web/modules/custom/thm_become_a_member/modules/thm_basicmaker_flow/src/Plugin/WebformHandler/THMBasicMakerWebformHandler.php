<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 1/26/18
 * Time: 3:22 PM
 */

namespace Drupal\thm_basicmaker_flow\Plugin\WebformHandler;

use Drupal\Core\Form\FormStateInterface;
use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\WebformSubmissionInterface;

/**
 * Form submission handler.
 *
 * Redirects submissions from the "BasicMaker Membership Flow" webform
 * to the "User Profile" survey webform.
 *
 * @WebformHandler(
 *   id = "thm_basicmaker_flow_handler",
 *   label = @Translation("BasicMaker Flow Handler"),
 *   category = @Translation("Submission Redirector"),
 *   description = @Translation("Routes submission data to another submission"),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_UNLIMITED,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_PROCESSED,
 *   submission = \Drupal\webform\Plugin\WebformHandlerInterface::SUBMISSION_OPTIONAL,
 * )
 */
class THMBasicMakerWebformHandler extends WebformHandlerBase {
  public function submitForm(array &$form, FormStateInterface $formState, WebformSubmissionInterface $webformSubmission) {
    $values           = $formState->getValue($form['#parents']);
    $currentPage      = $webformSubmission->getCurrentPage();

    if ($currentPage === 'user_profile' && isset($values['gender'])) {
      thm_basicmaker_flow_form_submit($form, $formState);
    }
  }
}