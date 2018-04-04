<?php

namespace Drupal\thm_donation_flow\EventSubscriber;

use Drupal\state_machine\Event\WorkflowTransitionEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Sets the email address for orders made by guests.
 *
 */
class OrderEmailSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events = [
      'commerce_order.place.pre_transition' => ['setEmailAddress', -50],
    ];
    return $events;
  }

  /**sud
   * Sets the order number to the order ID.
   *
   * Skipped if the email address has already been set.
   *
   * @param \Drupal\state_machine\Event\WorkflowTransitionEvent $event
   *   The transition event.
   */
  public function setEmailAddress(WorkflowTransitionEvent $event) {
    /** @var \Drupal\commerce_order\Entity\OrderInterface $order */
    $order = $event->getEntity();
    if (!$order->getEmail()) {
      drupal_set_message('set order email here.');
    }
  }

}
