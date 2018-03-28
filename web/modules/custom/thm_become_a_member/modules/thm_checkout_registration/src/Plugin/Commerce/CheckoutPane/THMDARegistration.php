<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 1/4/18
 * Time: 3:23 PM
 */

namespace Drupal\thm_checkout_registration\Plugin\Commerce\CheckoutPane;

use Drupal\Core\Entity\Entity\EntityFormDisplay;
use Drupal\Core\Entity\Display\EntityFormDisplayInterface;
use Drupal\commerce\CredentialsCheckFloodInterface;
use Drupal\commerce_checkout\Plugin\Commerce\CheckoutFlow\CheckoutFlowInterface;
use Drupal\commerce_checkout\Plugin\Commerce\CheckoutPane\CheckoutPaneBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\user\UserInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\Entity\EntityStorageException;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Custom Commerce Checkout (login/registration) Pane
 *
 * @CommerceCheckoutPane(
 *   id = "thmda_access_registration",
 *   label = @Translation("THM Digital Access Registration Step"),
 *   default_step = "login",
 * )
 */
class THMDARegistration extends CheckoutPaneBase {

  /**
   * The credentials check flood controller.
   *
   * @var \Drupal\commerce\CredentialsCheckFloodInterface
   */
  protected $credentialsCheckFlood;

  /**
   * @var EntityFormDisplayInterface
   */
  protected $userProfileForm;

  protected $user;

  /**
   * The client IP address.
   *
   * @var string
   */
  protected $clientIp;

  /**
   * The user authentication object.
   *
   * @var \Drupal\user\UserAuthInterface
   */
  protected $userAuth;


  /**
   * Populates account custom fields from user-registration form.
   *
   * @param $formValues
   * @param \Drupal\user\UserInterface $userAccount
   */
  protected function populateAccount($formValues, UserInterface &$userAccount) {
    foreach ($formValues as $fieldName => $formValue) {
      if (!($formValue instanceof TranslatableMarkup)
        && substr($fieldName, 0, 6) === 'field_') {
        if ($fieldName === 'field_intl_address') {
          $userAccount->set($fieldName, $formValue[0]['address']);
        } else {
          $userAccount->set($fieldName, @$formValue[0]['value']);
        }
      }
    }

    try {
      $userAccount->save();

    } catch (EntityStorageException $storageException) {
      $msg = 'An error occurred. Your account data may not have been saved.';
      drupal_set_message($msg);

      \Drupal::logger('thm_checkout_registration')
        ->error($storageException->getMessage());
    }
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition, CheckoutFlowInterface $checkout_flow = NULL) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $checkout_flow,
      $container->get('entity_type.manager'),
      $container->get('commerce.credentials_check_flood'),
      $container->get('current_user'),
      $container->get('user.auth'),
      $container->get('request_stack')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function isVisible() {
    return \Drupal::currentUser()->isAnonymous();
  }

  /**
   * {@inheritdoc}
   */
  public function buildPaneForm(array $pane_form, FormStateInterface $form_state, array &$complete_form) {

    $this->user = \Drupal::entityTypeManager()
      ->getStorage('user')
      ->create();

    $this->userProfileForm = EntityFormDisplay::collectRenderDisplay(
      $this->user, 'default');

    $back_step_url = 'internal:/checkout/' . $this->order->id() . '/membership_options';

    $pane_form['#theme'] = 'thm_registration_info';

    $pane_form['#tree'] = true;

    // embedded forms don't play nice with container/fieldset/prefix/suffix
    // elements
    $pane_form['open_account_info_wrapper'] = [
      '#markup' => '<div class="membership-account-info">',
      '#weight' => -100
    ];

    $pane_form['account_info'] = [
      '#type' => '#form',
      '#value'=> $this->userProfileForm->buildForm($this->user, $pane_form, $form_state)
    ];

    $pane_form['close_account_info_wrapper'] = [
      '#markup' => '</div>',
      '#weight' => 190
    ];

    $pane_form['register'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Register'),
      '#weight' => 200,
      '#attributes' => [
        'class' => [
          'form-wrapper__login-option',
          'form-wrapper__guest-checkout',
        ],
      ],
    ];
    $pane_form['register']['mail'] = [
      '#type' => 'email',
      '#title' => $this->t('Email address'),
      '#required' => FALSE,
    ];
    $pane_form['register']['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Username'),
      '#maxlength' => UserInterface::USERNAME_MAX_LENGTH,
      '#description' => $this->t("Several special characters are allowed, including space, period (.), hyphen (-), apostrophe ('), underscore (_), and the @ sign."),
      '#required' => FALSE,
      '#attributes' => [
        'class' => ['username'],
        'autocorrect' => 'off',
        'autocapitalize' => 'off',
        'spellcheck' => 'false',
      ],
      '#default_value' => '',
    ];
    $pane_form['register']['password'] = [
      '#type' => 'password_confirm',
      '#size' => 60,
      '#description' => $this->t('Provide a password for the new account in both fields.'),
      '#required' => FALSE,
    ];

    $pane_form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Next'),
      '#weight' => 210,
      '#op' => 'continue'
    ];

    $pane_form['cancel'] = [
      '#type' => 'link',
      '#limit_validation_errors' => [],
      '#title' => $this->t('go back'),
      '#url' => Url::fromUri($back_step_url),
      '#weight' => 220,
      '#op' => 'cancel'
    ];

    return $pane_form;
  }

  public function validatePaneForm(array &$pane_form, FormStateInterface $form_state, array &$complete_form) {
    $values = $form_state->getValue($pane_form['#parents']);
    $triggering_element = $form_state->getTriggeringElement();

    switch ($triggering_element['#op']) {
      case 'cancel':
        $form_state->clearErrors();
        break;

      case 'continue':

        $email = $values['register']['mail'];
        $username = $values['register']['name'];
        $password = trim($values['register']['password']);
        if (empty($email)) {
          $form_state->setError($pane_form['register']['mail'], $this->t('Email field is required.'));
          return;
        }
        if (empty($username)) {
          $form_state->setError($pane_form['register']['name'], $this->t('Username field is required.'));
          return;
        }
        if (empty($password)) {
          $form_state->setError($pane_form['register']['password'], $this->t('Password field is required.'));
          return;
        }

        /** @var \Drupal\user\UserInterface $account */
        $account = $this->entityTypeManager->getStorage('user')->create([
          'mail' => $email,
          'name' => $username,
          'pass' => $password,
          'status' => TRUE,
        ]);
        // Validate the entity. This will ensure that the username and email
        // are in the right format and not already taken.
        $violations = $account->validate();
        foreach ($violations->getByFields(['name', 'mail']) as $violation) {
          list($field_name) = explode('.', $violation->getPropertyPath(), 2);
          $form_state->setError($pane_form['register'][$field_name], $violation->getMessage());
        }

        if (!$form_state->hasAnyErrors()) {
          $account->save();
          $form_state->set('logged_in_uid', $account->id());
        }
        break;

    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitPaneForm(array &$pane_form, FormStateInterface $form_state, array &$complete_form) {
    $triggering_element = $form_state->getTriggeringElement();
    switch ($triggering_element['#op']) {
      case 'continue':
        $storage = $this->entityTypeManager->getStorage('user');
        /** @var \Drupal\user\UserInterface $account */
        $account = $storage->load($form_state->get('logged_in_uid'));

        user_login_finalize($account);
        $this->populateAccount($form_state->getValues()['thmda_access_registration'], $account);
        $this->order->setCustomer($account);

        _user_mail_notify('register_no_approval_required', $account);
        //$this->credentialsCheckFlood->clearAccount($this->clientIp, $account->getAccountName());
        return $form_state->setRedirect('commerce_checkout.form', [
          'commerce_order' => $this->order->id(),
          'step' => $this->checkoutFlow->getNextStepId($this->getStepId()),
        ]);

      case 'cancel':
        $uri = 'internal:/checkout/' . $this->order->id() . '/membership_options';
        return new RedirectResponse(Url::fromUri($uri)->toString());
    }


  }
}