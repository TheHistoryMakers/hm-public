<?php

namespace Drupal\thm_jwt\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\jwt\Authentication\Event\JwtAuthGenerateEvent;
use Drupal\jwt\Authentication\Event\JwtAuthEvents;
use Drupal\Core\Session\AccountInterface;

/**
 * Class THMJWTGenerator.
 */
class THMJWTGenerator implements EventSubscriberInterface {

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected $currentUser;

  /**
   * Constructor.
   *
   * @param \Drupal\Core\Session\AccountInterface $user
   *   The current user.
   */
  public function __construct(AccountInterface $user) {
    $this->currentUser = $user;
  }

  public static function getSubscribedEvents() {
    $events[JwtAuthEvents::GENERATE][] = ['generate'];
    return $events;
  }

  protected function getAccess() {
    return in_array('thm_paid_member', $this->currentUser->getRoles()) ? 'All' : 'None';
  }

  protected function modifyExpiration(JwtAuthGenerateEvent $event) {
    $event->removeClaim('exp');
    $event->addClaim('exp', strtotime('+24 hours'));
  }

  protected function addAcctClaims(JwtAuthGenerateEvent $event) {
    $event->addClaim('username', $this->currentUser->getAccountName());
    $event->addClaim('subscription', $this->getAccess());
  }

  public function generate(JwtAuthGenerateEvent $event) {
    $event->removeClaim('drupal');

    $this->addAcctClaims($event);
    $this->modifyExpiration($event);
  }

}
