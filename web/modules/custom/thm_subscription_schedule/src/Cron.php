<?php

namespace Drupal\thm_subscription_schedule;

use Drupal\commerce_recurring\CronInterface;
use Drupal\commerce_recurring\RecurringOrderManagerInterface;
use Drupal\commerce_recurring\ScheduledChange;
use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
/**
 * Default cron implementation.
 */
class Cron implements CronInterface {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The recurring order manager.
   *
   * @var \Drupal\commerce_recurring\RecurringOrderManagerInterface
   */
  protected $recurringOrderManager;

  /**
   * The time.
   *
   * @var \Drupal\Component\Datetime\TimeInterface
   */
  protected $time;

  /**
   * Constructs a new Cron object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Drupal\commerce_recurring\RecurringOrderManagerInterface $recurring_order_manager
   *   The recurring order manager.
   * @param \Drupal\Component\Datetime\TimeInterface $time
   *   The time.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager, RecurringOrderManagerInterface $recurring_order_manager, TimeInterface $time) {
    $this->entityTypeManager = $entity_type_manager;
    $this->recurringOrderManager = $recurring_order_manager;
    $this->time = $time;
  }

  /**
   * {@inheritdoc}
   */
  public function run() {

    $subscription_storage = $this->entityTypeManager->getStorage('commerce_subscription');
    /**
     * Ensure that any subscriptions without an end date specified will get the end date of the
     * original order's billing schedule end date. This rule assumes then that there is only one
     * billing cycle to be assumed and we are automatically cancelling the user's subscription
     * at the end of the first billing period.
     */
    $no_end_subscription_ids = $subscription_storage->getQuery()
      ->notExists('ends')
      ->execute();

    $no_end_subscriptions = $subscription_storage->loadMultiple($no_end_subscription_ids);
    foreach($no_end_subscriptions as $no_end_subscription){

      $billing_schedule = $no_end_subscription->getBillingSchedule();
      $config = $billing_schedule->getPluginConfiguration();

      $date_mod_instruction = '+' . $config['interval']['number'] . ' ' . $config['interval']['unit'];
      $cancel_date = $no_end_subscription->getStartDate()->modify($date_mod_instruction);
      $cancel_date->modify('-12 hour');
      $cancel_timestamp = $cancel_date->getTimeStamp();
      $no_end_subscription->setEndTime($cancel_timestamp);

      $scheduled_change = new ScheduledChange('state', 'canceled', $cancel_timestamp);
      $no_end_subscription->setScheduledChanges($scheduled_change->toArray());
      $no_end_subscription->save();
    }


    /**
     * Clean up the active transactions that have already specified an end date that has passed.
     * By canceling the subscription, we inherently then delete the draft order that is pending
     * and we thereby block the order from being closed
     */
    $overdue_subscription_ids = $subscription_storage->getQuery()
      ->condition('state', ['active'], 'IN')
      ->condition('ends', $this->time->getRequestTime(), '<=')
      ->accessCheck(FALSE)
      ->execute();

    $overdue_subscriptions = $subscription_storage->loadMultiple($overdue_subscription_ids);
    foreach ($overdue_subscriptions as $overdue_subscription) {
      $expired_time = $overdue_subscription->getEndDate()->getTimeStamp();
      $scheduled_change = new ScheduledChange('state', 'canceled', $expired_time);
      $overdue_subscription->setScheduledChanges($scheduled_change->toArray());
      $overdue_subscription->applyScheduledChanges();
      $overdue_subscription->save();
    }
  }
}
